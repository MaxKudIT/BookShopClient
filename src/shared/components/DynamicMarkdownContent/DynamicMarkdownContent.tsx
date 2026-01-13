import ReactMarkdown from 'react-markdown';

function DynamicMarkdownContent({ content }: {content: string}) {

const formatContent = (text: string) => {
    if (!text) return text;

    const paragraphs = text.split(/\n\n+/);
    
    return paragraphs.map(paragraph => {
    
        const withFormattedGosts = paragraph.replace(
            /(ГОСТ(?:\s+Р)?(?:\s+ИСО)?\s+[\d.-]+(?:\s+«[^»]+»)?)([^.]*\.)/g,
            '**$1**$2'
        );
        
        return withFormattedGosts;
    }).join('\n\n'); 
};
  const formattedContent = formatContent(content);

  return (
    <div style={{ color: 'white', opacity: 0.8, letterSpacing: 0.2, lineHeight: 1.5 }}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p style={{ marginBottom: '15px', fontSize: 16 }} {...props} />,
          strong: ({ node, ...props }) => <strong style={{ fontWeight: 600 }} {...props} />,
          ul: ({ node, ...props }) => <ul style={{ 
            marginLeft: '20px', 
            marginBottom: '16px',
            paddingLeft: '0',
            listStyleType: 'disc'
          }} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '16px', lineHeight: 1.5 }} {...props} />,
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
}

export default DynamicMarkdownContent;