Remediation
Upgrade chart.js to version 2.9.4 or later.

Always verify the validity and compatibility of suggestions with your codebase.

Details
CVE-2020-7746
high severity
Vulnerable versions: < 2.9.4
Patched version: 2.9.4
This affects the package chart.js before 2.9.4. The options parameter is not properly sanitized when it is processed. When the options are processed, the existing options (or the defaults options) are deeply merged with provided options. However, during this operation, the keys of the object being set are not checked, leading to a prototype pollution.
