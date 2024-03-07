// import React from 'react';
// import File from '../../src/components/File';
// import { FileOrFolder } from '../../src/interfaces/fileFolder.interface';
// import { fileFolderData } from '../../src/data/data';
// import { icons } from '../../src/constansts';
// import Folder from '../../src/components/Folder';
// let open = false
// const toggleOpen = (e: MouseEvent) => {
//     e.stopPropagation()

// }
// describe('<Folder />', () => {
//   it('renders file component correctly', () => {

//     cy.mount(<Folder open={true} toggleOpen={} />);
//   });
//   it('renders file name as provided', () => {
//     cy.mount(<File node={dummyNode} parent={fileFolderData} />);
//     cy.get('button').should('contains.text', dummyNode.name);
//   });
// });
// describe('Hover context menu', function () {
//   ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
//     it(`dispatches event: '${event}`, function () {
//       cy.mount(<File node={dummyNode} parent={fileFolderData} />);
//       cy.get('li').trigger(event);
//       cy.get('button').should('contains.text', icons.delete);
//       cy.get('button').should('contains.text', icons.edit);
//       cy.contains('button', icons.folder).should('not.exist');
//     });
//   });
// });
