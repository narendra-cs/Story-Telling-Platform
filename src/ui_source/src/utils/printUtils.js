/**
 * Utility functions for handling print operations
 */

export const printStory = (storyContent, storyTitle = 'Your Story') => {
  // Create a print window
  const printWindow = window.open('', '', 'width=800,height=600');

  // Write the print content
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${storyTitle}</title>
        <style>
          @page { size: auto; margin: 1cm; }
          body { 
            font-family: 'Georgia', serif; 
            line-height: 1.6; 
            font-size: 12pt; 
            color: #000; 
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .story-title {
            font-family: 'Playfair Display', serif;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 24pt;
          }
          .story-paragraph {
            text-indent: 2em;
            margin: 1em 0;
            line-height: 1.6;
            text-align: justify;
          }
          .story-paragraph:first-of-type {
            text-indent: 0;
          }
          .story-paragraph:first-of-type:first-letter {
            font-size: 2em;
            float: left;
            line-height: 0.8;
            margin-right: 0.1em;
            font-family: 'Playfair Display', serif;
            font-weight: bold;
          }
          .story-metadata {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
          }
          .metadata-label {
            font-weight: bold;
            margin-right: 0.5rem;
          }
          .tag {
            background-color: #f5f5f5;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            display: inline-block;
            margin-bottom: 0.5rem;
          }
        </style>
      </head>
      <body>
        ${storyContent}
        <script>
          // Print and close after loading
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 100);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
