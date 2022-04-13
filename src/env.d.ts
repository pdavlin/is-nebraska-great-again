/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly CFDB_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}