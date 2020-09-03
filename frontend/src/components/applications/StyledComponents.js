import styled from '@emotion/styled/macro';

export const ApplicationDetailInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: min-content minmax(0, 1fr);
  max-height: 100%;
  grid-template-areas:
    'sidebar header'
    'sidebar content';

  .sidebar {
    min-width: 200px;
    grid-area: sidebar;
    background-color: #ffffff;
    padding: 24px;
    height: fit-content;
  }

  .sidebar .name {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
  }

  .sidebar .professional_description {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  .header {
    grid-area: header;
    display: flex;
    flex-direction: rows;
    align-items: center;
    justify-content: space-between;
    width: 825px;
    height: fit-content;
    padding-right: 28px;
  }

  .header .options {
    display: flex;
    flex-direction: row;
  }

  .header .options .option {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    padding: 9px 25px;
    cursor: pointer;
  }

  .header .options .option.active {
    border-bottom: 2px solid #096dd9;
  }

  .content {
    width: 825px;
    grid-area: content;
    background-color: #f7fafc;
    padding: 40px 28px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .content .title_section {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 12px;
  }

  .content .text_section {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
  }

  .download_cv {
    margin-top: 10px;
    color: #3c2dff;
    border: 1px solid #3c2dff;
    background: #ffffff;
    padding: 8px 16px;
  }
`;

export const CursorPointer = styled.svg`
  cursor: pointer;
`;
