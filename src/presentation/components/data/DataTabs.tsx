import React, { useEffect } from "react";

// App Context
import { useAppContext } from "../../containers/ApplicationContext";
// Strings externalisation
import { useLocaleStrings } from "../../containers/StringsContext";

import InputTabsWithFormat from "../../../components/InputTabsWithFormat";

interface DataTabsProps {
  data: { index: number; [key: string]: any };
  activeSource?: string;
  handleTabChange: (event: React.ChangeEvent<{}>, value: any) => void;
  textAreaValue?: string;
  handleByTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  urlValue: string;
  handleDataUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFormat: string;
  handleDataFormatChange: (event: React.ChangeEvent<{}>, value: any) => void;
  resetFromParams?: () => void;
  fromParams?: boolean;
  streamValue?: { [key: string]: any };
  handleStreamChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  allowStream: boolean;
  name?: string;
  subname?: string;
  setCodeMirror?: (editor: any) => void;
}

const DataTabs: React.FC<DataTabsProps> = (props = {
  data: { index: 0, defaultKey: "defaultValue" },
  activeSource: useLocaleStrings().getString("sources.default"),
  handleTabChange: () => {},
  textAreaValue: "",
  handleByTextChange: () => {},
  urlValue: "",
  handleDataUrlChange: () => {},
  handleFileUpload: () => {},
  selectedFormat: useLocaleStrings().getString("formats.defaultData"),
  handleDataFormatChange: () => {},
  resetFromParams: () => {},
  fromParams: false,
  streamValue: {},
  handleStreamChange: () => {},
  allowStream: false,
  name: useLocaleStrings().getString("texts.dataTabs.dataHeader"),
  subname: "",
  setCodeMirror: () => {}
}) => {
  const { rdfData, setRdfData, streamingData, setStreamingData } = useAppContext();

  const dataIndex = props?.data?.index;

  const { getString } = useLocaleStrings();

  useEffect(() => {
    if (props.data) {
      const newDataset = rdfData.reduce(
        (acc: any[], curr: any) =>
          dataIndex === curr.index ? [...acc, props.data] : [...acc, curr],
        []
      );
      setRdfData(newDataset);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.allowStream) {
      setStreamingData(props.streamValue);
    }
  }, [props.streamValue]);

  return (
    <div>
      <InputTabsWithFormat
        nameInputTab={props.name}
        activeSource={props.activeSource || rdfData[dataIndex]?.activeSource}
        handleTabChange={props.handleTabChange}
        byTextName={props.subname}
        textAreaValue={props.textAreaValue || rdfData[dataIndex]?.textArea}
        byTextPlaceholder={getString("texts.placeholders.rdf")}
        handleByTextChange={props.handleByTextChange}
        handleUrlChange={props.handleDataUrlChange}
        urlValue={props.urlValue || rdfData[dataIndex]?.url}
        byURLPlaceholder={getString("texts.placeholders.url")}
        handleFileUpload={props.handleFileUpload}
        selectedFormat={props.selectedFormat || rdfData[dataIndex]?.format}
        handleFormatChange={props.handleDataFormatChange}
        urlFormats={getString("routes.server.dataFormatsInput")}
        setCodeMirror={props.setCodeMirror}
        fromParams={props.fromParams || rdfData[dataIndex]?.fromParams}
        resetFromParams={props.resetFromParams}
        allowStream={props.allowStream}
        streamValue={props.streamValue || streamingData}
        handleStreamChange={props.handleStreamChange}
      />
    </div>
  );
};

export default DataTabs;
