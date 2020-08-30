import styled from '@emotion/styled/macro';

export const Title = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 20px;
`;

export const JobDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
`;

export const JobCard = styled.div`
  width: 250px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 40px 32px 16px 32px;
  align-items: center;
  text-align: center;
`;

export const CompanyLogo = styled.img`
  max-width: 100%;
  max-height: 100px;
`;

export const CompanyName = styled.p`
  margin-top: 12px;
  margin-bottom: 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 38px;
  word-break: break-word;
`;

export const GroupHorizontal = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: min-content 1fr;
  column-gap: 8px;
  align-items: center;
  margin-bottom: 4px;
`;

export const GeneralTextCompany = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
`;

export const LinkWebsiteCompany = styled(GeneralTextCompany)`
  text-decoration-line: underline;
  cursor: pointer;
`.withComponent('a');

export const LinkStyled = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background-color: #3c2dff;
  width: 100%;
  padding: 8px 0px;
  cursor: pointer;
  margin-top: 41px;
`;

export const Separator = styled.div`
  border: 1px solid #000000;
  width: 100%;
  margin-top 16px;
  margin-bottom: 16px;
`;
