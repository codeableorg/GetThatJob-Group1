import styled from '@emotion/styled/macro';

const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-spacing: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);

  thead {
    background-color: #fafafa;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  thead tr th,
  tbody td {
    text-align: left;
    padding: 16px 24px 16px 16px;
    width: fit-content;
  }

  tbody tr {
    background-color: #ffffff;
    cursor: pointer;
  }

  tbody tr:nth-of-type(2n) {
    background-color: #e6f7ff;
  }
`;

export default Table;
