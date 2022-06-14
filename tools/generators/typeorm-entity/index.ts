import {
  Tree,
  formatFiles,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  applyChangesToString,
  ChangeType,
} from '@nrwl/devkit';
import { names } from 'nx/src/utils/command-line-utils';

interface TypeOrmEntityGeneratorOptions {
  name: string;
  project: string;
  directory: string;
}

export default async function (tree: Tree, schema: TypeOrmEntityGeneratorOptions) {
  try {
    createFiles(tree, schema);
    updateFiles(tree, schema);
    await formatFiles(tree);
  } catch(error) {
    throw new Error(error);
  }
}

const createFiles = (tree: Tree, schema: TypeOrmEntityGeneratorOptions) => {
  const libraryRoot = `${readProjectConfiguration(tree, schema.project).root}/${schema.directory || ''}`;
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    libraryRoot, // destination path of the files
    {
      className: names(schema.name).className,
      fileName: names(schema.name).fileName,
      tmpl: '',
    }
  );
};

const updateFiles = (tree: Tree, schema: TypeOrmEntityGeneratorOptions) => {
  const filePath = `${readProjectConfiguration(tree, schema.project).root}/${schema.directory || ''}/index.ts`;
  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();

  const updatedCode = applyChangesToString(contents, [
    {
      type: ChangeType.Insert,
      index: 0,
      text: `export * from './${names(schema.name).fileName}.entity';\n`,
    },
  ]);

  // only write the file if something has changed
  if (updatedCode !== contents) {
    tree.write(filePath, updatedCode);
  }
};
