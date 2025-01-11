/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_BACKEND_IP: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
