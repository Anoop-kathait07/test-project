const stableSort = (array: any, comparator: any): any => {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((elementFirst: any, elementSecond: any) => {
      const order = comparator(elementFirst[0], elementSecond[0]);
      if (order !== 0) {
        return order;
      }
      return elementFirst[1] - elementSecond[1];
    });
    return stabilizedThis.map((el: string) => el[0]);
  };
  
  const getComparator = (order: string, orderBy: string, isField: string): any => {
    return order === 'desc'
      ? (a: string, b: string) => descendingComparator(a, b, orderBy, isField)
      : (a: string, b: string) => -descendingComparator(a, b, orderBy, isField);
  };
  
  const descendingComparator = (a: any, b: any, orderBy: string, isField: string): any => {
    if (isField === 'isDate') {
      const elementFirst = new Date(a[orderBy]).getTime();
      const elementSecond = new Date(b[orderBy]).getTime();
      if (elementFirst < elementSecond) return 1;
      else if (elementFirst > elementSecond) return -1;
      else return 0;
    }
  
    if (isField === 'isNumber') {
      const elementFirst = a[orderBy] ? parseFloat(a[orderBy]) : 0;
      const elementSecond = b[orderBy] ? parseFloat(b[orderBy]) : 0;
  
      if (elementSecond < elementFirst) {
        return -1;
      }
      if (elementSecond > elementFirst) {
        return 1;
      }
      return 0;
    }
  
    if (isField === 'isAlphaNumeric') {
      const elementFirst = a[orderBy] ? a[orderBy].toLowerCase() : '';
      const elementSecond = b[orderBy] ? b[orderBy].toLowerCase() : '';
  
      if (elementSecond < elementFirst) {
        return -1;
      }
      if (elementSecond > elementFirst) {
        return 1;
      }
      return 0;
    }
  };
  
  export { stableSort, getComparator };
  