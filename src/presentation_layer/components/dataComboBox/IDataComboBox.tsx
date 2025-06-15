interface IDataComboBox {
    inputId: string;
    label: string;
    setOfData: string[];
    data: string | undefined;
    setData(data: string): void;
}

export default IDataComboBox;