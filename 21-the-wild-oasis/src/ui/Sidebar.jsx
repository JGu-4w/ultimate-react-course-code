import styled from 'styled-components';

const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
`;

const Sidebar = () => {
  return <StyleSidebar>Sidebar</StyleSidebar>;
};

export default Sidebar;
