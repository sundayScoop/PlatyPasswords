# PlatyPasswords
## What is PlatyPus Passwords?
PlatyPus Passwords, "Platy", is a proof of concept decentralized password manager that doesn't hold any encryption keys to secure users' passwords. Instead, Platy uses the Tide Enclave to authenticate and retrieve user's encryption keys, which are able to decrypt their own passwords locally.

Platy's servers NEVER have access to:
1. The user's username or password
2. The user's plaintext passwords
3. The encryption key that secured their passwords

That means that if an adversery fully took control of Platy's servers, absolutely zero user data would be compromised.

## I want to run Platy Locally
Great! Make sure you have the [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) installed, then simply:

```
git clone https://github.com/sundayScoop/PlatyPasswords.git
dotnet run --urls=http://localhost:8000
```

Navigating to [localhost](http://localhost:8000) will show you the login page to Platy. 

If you want to explore what the encrypted data looks like, install a DB explorer such as [Db Browswer](https://sqlitebrowser.org/) and open the LocalDatabase.db in the project.

## I want to learn more about how Platy Works
There is this [video](https://clipchamp.com/watch/hB5vCvUMx8e) where I explain how Platy works, and how it uses the Tide Enclave to secure user data.
### UPDATE: PlatyPus Passwords now has a simple UI instead of the Tide Enclave. This is due to the Heimdall SDK changning from a front and backend JS module, to just a backend JS SDK.
