function RequestDelegatedAccessToken{
<#
.SYNOPSIS
Requests an access token with delegated permissions and refresh token
.RETURNS
Returns an access token
.PARAMETER Client Secret
-The App Secret you get from your tenant
.PARAMETER tenantID
-This is the tenant ID eg. domain.onmicrosoft.com
.PARAMETER ClientID
-This is the app reg client ID
.PARAMETER Secret
-This is the client secret
.PARAMETER Scope
-A comma delimited list of access scope, default is: "Group.ReadWrite.All,User.ReadWrite.All"
#>
Param(
[parameter(Mandatory = $true)]
[String]
$tenantID,
[parameter(Mandatory = $true)]
[String]
$ClientID,
[parameter(Mandatory = $false)]
[String]
$Scope,
[parameter(Mandatory = $true)]
[String]
$Secret,
[parameter(Mandatory = $true)]
[String]
$redirectURL,
[parameter(Mandatory = $false)]
[ValidateSet('Commercial','GCCH','DOD')]
[String]
$GraphEnvironmentName
)
#Sets Azure Environment Name
If ($GraphEnvironmentName -eq "GCCH")
    {
    $LogonURL = "https://login.microsoftonline.us"
    $GraphEndPoint = "https://graph.microsoft.us/v1.0/"
    }
ElseIf ($GraphEnvironmentName -eq "DOD")
    {
    $LogonURL = "https://login.microsoftonline.us"
    $GraphEndPoint = "https://dod-graph.microsoft.us/v1.0"
    }
ElseIf ($GraphEnvironmentName -eq "Commercial")
    {
    $LogonURL = "https://login.microsoftonline.com"
    $GraphEndPoint = "https://graph.microsoft.com/v1.0/"
    }
Else
    {
    $LogonURL = "https://login.microsoftonline.com"
    $GraphEndPoint = "https://graph.microsoft.com/v1.0/"
    }

$EncodedredirectURL = [System.Web.HttpUtility]::UrlEncode($redirectURL.tostring())
$Url1 = "$($LogonURL)/$($tenantID)/oauth2/v2.0/authorize?client_id=$($ClientId)&response_type=code&redirect_uri=$($EncodedredirectURL)&response_mode=query&scope=$($Scope)&state=12345"
Write-Host "Stop the script and copy/paste this URL into your browser"
Write-Host "$url1"
Write-Host "Then take the redirect URL and paste the code in the code variable. The code is between the words code= and &state"
$code = Read-Host "Please enter code"
##
$ScopeFixup = $Scope.replace(',','%20')
$apiUri = "$($LogonURL)/$tenantID/oauth2/v2.0/token"
$body = "client_id=$ClientID&scope=$ScopeFixup&redirect_uri=$($EncodedredirectURL)&grant_type=authorization_code&client_secret=$Secret&code=$code"
write-verbose $body -Verbose
$Newtoken = Invoke-RestMethod -Uri $apiUri -Method Post -ContentType 'application/x-www-form-urlencoded' -body $body
return $Newtoken
#$Newtoken
}

function RefreshAccessToken{

<#
.SYNOPSIS
Refreshes an access token based on refresh token from RequestDelegatedAccessToken command
.RETURNS
Returns a refreshed access token
.PARAMETER Token
-Token is the existing refresh token
.PARAMETER tenantID
-This is the tenant ID eg. domain.onmicrosoft.com
.PARAMETER ClientID
-This is the app reg client ID
.PARAMETER Secret
-This is the client secret
.PARAMETER Scope
-A comma delimited list of access scope, default is: "Group.ReadWrite.All,User.ReadWrite.All"
#>

Param(
[parameter(Mandatory = $true)]
[String]
$Token,
[parameter(Mandatory = $true)]
[String]
$tenantID,
[parameter(Mandatory = $true)]
[String]
$ClientID,
[parameter(Mandatory = $true)]
[String]
$redirectURL,
[parameter(Mandatory = $false)]
[String]
$Scope = "User.ReadWrite.All offline_access",
[parameter(Mandatory = $true)]
[String]
$Secret,
[parameter(Mandatory = $false)]
[ValidateSet('Commercial','GCCH','DOD')]
[String]
$AzureEnvironmentName
)
#Sets Azure Environment Name
If ($GraphEnvironmentName -eq "GCCH")
    {
    $LogonURL = "https://login.microsoftonline.us"
    $GraphEndPoint = "https://graph.microsoft.us/v1.0/"
    }
ElseIf ($GraphEnvironmentName -eq "DOD")
    {
    $LogonURL = "https://login.microsoftonline.us"
    $GraphEndPoint = "https://dod-graph.microsoft.us/v1.0"
    }
ElseIf ($GraphEnvironmentName -eq "Commercial")
    {
    $LogonURL = "https://login.microsoftonline.com"
    $GraphEndPoint = "https://graph.microsoft.com/v1.0/"
    }
Else
    {
    $LogonURL = "https://login.microsoftonline.com"
    $GraphEndPoint = "https://graph.microsoft.com/v1.0/"
    }



$ScopeFixup = $Scope.replace(',','%20')
$apiUri = "$($LogonURL)/$tenantID/oauth2/v2.0/token"
$body = "client_id=$($ClientID)&scope=$($ScopeFixup)&refresh_token=$($Token)&redirect_uri=$($redirectURL)&grant_type=refresh_token&client_secret=$Secret"

write-verbose $body -Verbose
$Refreshedtoken = (Invoke-RestMethod -Uri $apiUri -Method Post -ContentType 'application/x-www-form-urlencoded' -body $body )
return $Refreshedtoken
}
