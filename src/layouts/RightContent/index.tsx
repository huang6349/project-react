import HeaderWrapper from './HeaderWrapper';
import HeaderAvatarDropdown from './HeaderAvatarDropdown';
import HeaderDocs from './HeaderDocs';

export const RightContent = () => {
  return (<HeaderWrapper>
    <HeaderDocs />
    <HeaderAvatarDropdown />
  </HeaderWrapper>);
};
