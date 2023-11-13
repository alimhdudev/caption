import React, { useState, useEffect } from 'react';

function SubtitleEditor({ vttData }) {
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    if (typeof vttData === 'string') {
      const lines = vttData.split('\n');
      const newSubtitles = [];
      let index = 0;
      while (index < lines.length) {
        if (lines[index].startsWith('00:')) {
          const times = lines[index].split(' --> ');
          const text = lines[index + 1];
          newSubtitles.push({ start: times[0], end: times[1], text });
          index += 3;
        } else {
          index++;
        }
      }
      setSubtitles(newSubtitles);
    }
  }, [vttData]);

  const handleSubtitleChange = (index, event) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index].text = event.target.value;
    setSubtitles(newSubtitles);
  };

  return (
    <div>
      {subtitles.map((subtitle, index) => (
        <div key={index}>
          <span>{subtitle.start} - {subtitle.end}</span>
          <input value={subtitle.text} onChange={(event) => handleSubtitleChange(index, event)} />
        </div>
      ))}
    </div>
  );
}

export default SubtitleEditor;
