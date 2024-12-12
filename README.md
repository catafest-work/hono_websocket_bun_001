These commands will create the hono with bun :
```
npm create hono@latest

> npx
> create-hono

create-hono version 0.14.3
? Target directory hono_websocket_bun_001
? Which template do you want to use? bun
? Do you want to install project dependencies? yes
? Which package manager do you want to use? bun
√ Cloning the template
√ Installing project dependencies
🎉 Copied project files

Get started with: cd hono_websocket_bun_001
```
To install dependencies:
```sh
bun install
bun install v1.1.33 (247456b6)

Checked 6 installs across 7 packages (no changes) [29.00ms]
```

To run:
```sh
>bun run dev
$ bun run --hot src/index.ts
Started server http://localhost:3000
```

open http://localhost:3000 and you will see this:
```
Hello Hono!
```
I used source code tsx on index.tsx and I keep the old source code index.ts created for hono and bun.
I add the index.tsx on package.json file:
```
{
  "name": "hono_websocket_bun_001",
  "scripts": {
    "dev-ts": "bun run --hot src/index.ts",
    "dev-tsx": "bun run --hot src/index.tsx"
  },
  "dependencies": {
    "hono": "^4.6.13"
  },
  "devDependencies": {
    "@types/bun": "latest"
  }
}
```
Run with:
```
hono_websocket_bun_001>npm run dev-tsx   

> dev-tsx
> bun run --hot src/index.tsx

Started server http://localhost:3000
Sending order update
Sending order update
...
```
Using bunx to run the project:
```aiignore
hono_websocket_bun_001>bun add -d tsx
bun add v1.1.33 (247456b6)

installed tsx@4.19.2 with binaries:
 - tsx

17 packages installed [2.05s]
hono_websocket_bun_001>bun run --hot src/index.tsx
Started server http://localhost:3000
Sending order update
Sending order update
Sending order update
Sending order update
```

Using cypress with this project :
```aiignore
hono_websocket_bun_001>npm install cypress --save-dev       
hono_websocket_bun_001>npm install cypress --save-dev --foreground-scripts 
hono_websocket_bun_001>npx cypress open                                    
```
You can add the default spec files and run the cypress tests with https://example.cypress.io.
For this project create a folder into cypress/e2e named hono_websocket_bun_001_cypress and add cypress tests.
```aiignore
\hono_websocket_bun_001>cd cypress\e2e

\hono_websocket_bun_001\cypress\e2e>mkdir hono_websocket_bun_001_cypress

\hono_websocket_bun_001\cypress\e2e>cd hono_websocket_bun_001_cypress

```
