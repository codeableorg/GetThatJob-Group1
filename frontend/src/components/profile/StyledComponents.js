import styled from '@emotion/styled/macro';

export const ProfileContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 20px;
`;

export const DeleteButton = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-top: 12px;

  color: #f5222d;

  cursor: pointer;
`;

export const DeleteContainerModal = styled.div`
  padding: 20px;

  .control-buttom {
    display: flex;
    flex-direction: row;
  }

  p {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const CommonControlButtom = styled.div`
  padding: 8px 16px;
  margin-top: 12px;
  width: fit-content;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  cursor: pointer;
`;

export const ConfirmDeleteModal = styled(CommonControlButtom)`
  color: #ffffff;
  background-color: #f5222d;
  border: 1px solid #f5222d;
  margin-right: 20px;
`;

export const CancelDeleteModal = styled(CommonControlButtom)`
  color: #3c2dff;
  background-color: #ffffff;
  border: 1px solid #3c2dff;
`;
