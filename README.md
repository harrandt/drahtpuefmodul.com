# MachineFrontends

## Development server

The app will automatically reload if you change any of the source files.

-   Run `nx run drahtpruefung:serve` for a dev server.
-   Run `nx run restmaterial:serve` for a dev server.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.


## Inital Installation 

- Load nodeJs
- run pnpm install (To get all dependent software installed)
- To run with nx command :
  1) Run pnpm install -g nx
  2) Run pnpm install -g @nrwl/cli
- npx nx serve (Run default Project)

## Error 
Run command nx run restmaterial:serve
- Die Datei "C:\Users\xxx\AppData\Roaming\npm\nx.ps1" kann nicht geladen werden. Die Datei "C:\Users\xxx\AppData\Roaming\npm\nx.ps1" ist nicht digital signiert.
Solution
- Run Powershell as Administrator and run below command
  1) PS C:\WINDOWS\system32> cd C:\Users\xxx
  2) PS C:\Users\xxx> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
 
