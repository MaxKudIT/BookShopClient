import ReactMarkdown from 'react-markdown';
import styles from './DynamicMarkdownContent.module.scss'

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
    <div className={styles.markdown_content}>
      <ReactMarkdown>{formattedContent}</ReactMarkdown>
    </div>
  );
}

export default DynamicMarkdownContent;
