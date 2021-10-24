# VirtuWally app build and run tutorial

# FRONTEND

Requirements

1. Node js verision >= 12
2. Android studio
3. Text editor

Steps:

1. Download and install a node js version >= 12
2. Download Android studio
3. Follow steps 1 -> 4 from this link: https://reactnative.dev/docs/environment-setup
4. Create a AVD if you don't have one from AVD Manager in Android studio(For ex: Pixel 3, with System Image: Q)
5. In AVD Manager press the run button so that the AVD will run on your machine
6. Open terminal with the path: VirtuWally\VirtuWally
7. Run in terminal: npm i
8. Run in terminal: npm start
9. On the Metro Bundler Run on Android device/emulator
10. Wait

# BACKEND

Requirements

1. SQL Server Management Studio
2. C# IDE(Visual Studio pls)

Steps:

1. Download and install SSMS
2. In "VirtuWallyBackend\VirtuWally.Data\VirtuWallyContext.cs\" in OnConfiguring change the Data Source string with your data source string from SSMS(your Server name) and keep it like that if you want it to work(don't commit this change pls)
3. Open Package Manager Console, be sure that the Default Project is set on VirtuWally.Data, also set VirtuWally.Data as default project(Right click on it)
4. To update/create the database use "update-database verbose"
5. For changing the database model use "add-migration migrationName"
