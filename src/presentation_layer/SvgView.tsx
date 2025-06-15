let SvgView: React.FC<{ svgContent: string }> = ({ svgContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
};

export default SvgView;
