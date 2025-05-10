import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
  async onSuccess() {
    // Copy the JSON file to dist
    const jsonContent = await fs.promises.readFile(path.resolve('src/data.ts'), 'utf-8');

    // Extract the countryCapitals object
    const match = jsonContent.match(
      /export const countryCapitals: Readonly<CountryCapitalData> = ({[\s\S]*?});/
    );

    if (match && match[1]) {
      let jsonData = match[1];
      // Replace any potential TypeScript-specific syntax with valid JSON
      jsonData = jsonData.replace(/\/\/.*$/gm, ''); // Remove comments

      try {
        // Ensure it's valid JSON by parsing and stringifying
        const parsedData = Function(`return ${jsonData}`)();
        await fs.promises.writeFile(
          path.resolve('dist/countryCapitals.json'),
          JSON.stringify(parsedData, null, 2)
        );
        console.log('✅ Generated countryCapitals.json');

        // Add shebang to CLI file
        const cliEsmPath = path.resolve('dist/cli.mjs');
        const cliCjsPath = path.resolve('dist/cli.js');

        if (fs.existsSync(cliEsmPath)) {
          const cliContent = await fs.promises.readFile(cliEsmPath, 'utf-8');
          // Remove any existing shebang
          const contentWithoutShebang = cliContent.replace(/^#!.*\n/, '');
          await fs.promises.writeFile(cliEsmPath, contentWithoutShebang);
          console.log('✅ Removed shebang from ESM CLI');
        }

        if (fs.existsSync(cliCjsPath)) {
          const cliContent = await fs.promises.readFile(cliCjsPath, 'utf-8');
          // Remove any existing shebang
          const contentWithoutShebang = cliContent.replace(/^#!.*\n/, '');
          await fs.promises.writeFile(cliCjsPath, contentWithoutShebang);
          console.log('✅ Removed shebang from CJS CLI');
        }
      } catch (err) {
        console.error('❌ Failed to generate JSON file:', err);
      }
    } else {
      console.error('❌ Could not extract countryCapitals from data.ts');
    }
  },
});
