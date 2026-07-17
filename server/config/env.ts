const REQUIRED_ENV_VARS = ["PORT", "MONGODB_CNN", "SECRET_OR_PRIVATE_KEY"] as const;

type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

// Fail fast if any required environment variable is missing
export const validateEnv = (): void => {
    const missing = REQUIRED_ENV_VARS.filter((key: RequiredEnvVar) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
};
