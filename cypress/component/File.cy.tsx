import React from 'react';
import File from '../../src/components/File';
import { FileOrFolder } from '../../src/interfaces/fileFolder.interface';
import { fileFolderData } from '../../src/data/data';
import { icons } from '../../src/constansts';
const dummyNode: FileOrFolder = {
  type: 'folder',
  name: 'src',
  id: '2',
  data: [
    {
      type: 'file',
      meta: 'js',
      name: 'index.js',
      id: '3',
    },
  ],
};
describe('<File />', () => {
  it('renders file component correctly', () => {
    cy.mount(<File node={dummyNode} parent={fileFolderData} />);
  });
  it('renders file name as provided', () => {
    cy.mount(<File node={dummyNode} parent={fileFolderData} />);
    cy.get('button').should('contains.text', dummyNode.name);
  });
});
describe('Hover context menu', function () {
  ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
    it(`dispatches event: '${event}`, function () {
      cy.mount(<File node={dummyNode} parent={fileFolderData} />);
      cy.get('li').trigger(event);
      cy.get('button').should('contains.text', icons.delete);
      cy.get('button').should('contains.text', icons.edit);
      cy.contains('button', icons.folder).should('not.exist');
    });
  });
});
