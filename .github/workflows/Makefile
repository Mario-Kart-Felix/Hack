
#ifndef INCLUDED_MAKESHIFT_FUNCTIONAL_HPP_
#define INCLUDED_MAKESHIFT_FUNCTIONAL_HPP_


#include <utility> // for move(), forward<>()

#include <gsl-lite/gsl-lite.hpp> // for gsl_CPP17_OR_GREATER

#include <makeshift/detail/macros.hpp>     // for MAKESHIFT_DETAIL_CXXLEVEL, MAKESHIFT_DETAIL_EMPTY_BASES
#include <makeshift/detail/functional.hpp>


namespace makeshift {

namespace gsl = ::gsl_lite;


#if MAKESHIFT_DETAIL_CXXLEVEL >= 17
    //
    // Constructs a functor wrapper that selects the matching overload among a number of given functors.
    //ᅟ
    //ᅟ    auto type_name_func = overload(
    //ᅟ        [](int)   { return "int"; },
    //ᅟ        [](float) { return "float"; },
    //ᅟ        [](auto)  { return "unknown"; });
    //
template <typename... Fs>
struct MAKESHIFT_DETAIL_EMPTY_BASES overload : Fs...
{
    using Fs::operator ()...;
};
#else // ^^^ MAKESHIFT_DETAIL_CXXLEVEL >= 17 ^^^ / vvv MAKESHIFT_DETAIL_CXXLEVEL < 17 vvv
    //
    // Constructs a functor wrapper that selects the matching overload among a number of given functors.
    //ᅟ
    //ᅟ    auto type_name_func = overload(
    //ᅟ        [](int)   { return "int"; },
    //ᅟ        [](float) { return "float"; },
    //ᅟ        [](auto)  { return "unknown"; });
    //
template <typename... Fs>
struct overload;
template <typename F0>
struct MAKESHIFT_DETAIL_EMPTY_BASES overload<F0> : F0
{
    using F0::F0;
};
template <typename F0, typename... Fs>
struct MAKESHIFT_DETAIL_EMPTY_BASES overload<F0, Fs...> : F0, overload<Fs...>
{
    constexpr overload(F0 f0, Fs... fs) : F0(std::move(f0)), overload<Fs...>(std::move(fs)...) { }
    using F0::operator ();
    using overload<Fs...>::operator ();
};
#endif // MAKESHIFT_DETAIL_CXXLEVEL >= 17

#if gsl_CPP17_OR_GREATER
template <typename... Ts>
overload(Ts...) -> overload<Ts...>;
#endif // gsl_CPP17_OR_GREATER

    //
    // Constructs a functor wrapper that selects the matching overload among a number of given functors.
    //ᅟ
    //ᅟ    auto type_name_func = make_overload(
    //ᅟ        [](int)   { return "int"; },
    //ᅟ        [](float) { return "float"; },
    //ᅟ        [](auto)  { return "unknown"; });
    //
template <typename... Fs>
constexpr overload<Fs...> make_overload(Fs... fs)
{
    return { std::move(fs)... };
}


    //
    // Higher-order function for defining recursive lambda functions.
    //ᅟ
    // Note that the lambda function must explicitly declare a return type.
    //ᅟ
    //ᅟ    auto fac = y_combinator( 
    //ᅟ        [](auto fac, int i) -> int
    //ᅟ        {
    //ᅟ            return i <= 1 ? 1 : i * fac(i - 1);
    //ᅟ        });
    //ᅟ    int i = fac(4); // returns 24
    //
template <typename F>
class y_combinator
{
private:
    F func_;

public:
    constexpr explicit y_combinator(F _func)
        : func_(std::move(_func))
    {
    }

    template <typename... ArgsT>
    constexpr decltype(auto) operator()(ArgsT&&... args)
    {
        return func_(detail::y_combinator_func_ref<F&>{ func_ }, std::forward<ArgsT>(args)...);
    }
    template <typename... ArgsT>
    constexpr decltype(auto) operator()(ArgsT&&... args) const
    {
        return func_(detail::y_combinator_func_ref<F const&>{ func_ }, std::forward<ArgsT>(args)...);
    }
};
#if gsl_CPP17_OR_GREATER
template <typename F>
y_combinator(F) -> y_combinator<F>;
#endif // gsl_CPP17_OR_GREATER

    //
    // Higher-order function for defining recursive lambda functions.
    //ᅟ
    // Note that the lambda function must explicitly declare a return type.
    //ᅟ
    //ᅟ    auto fac = make_y_combinator( 
    //ᅟ        [](auto fac, int i) -> int
    //ᅟ        {
    //ᅟ            return i <= 1 ? 1 : i * fac(i - 1);
    //ᅟ        });
    //ᅟ    int i = fac(4); // returns 24
    //
template <typename F>
constexpr y_combinator<F> make_y_combinator(F func)
{
    return y_combinator<F>{ std::move(func) };
}


} // namespace makeshift


#endif // INCLUDED_MAKESHIFT_FUNCTIONAL_HPP_
