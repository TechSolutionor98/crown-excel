import React from 'react';

/**
 * Safely renders string text that may contain HTML (specifically <a> tags or <br /> tags).
 * If the string contains HTML, it returns a span with dangerouslySetInnerHTML.
 * Otherwise, it returns the plain text as is to avoid react warnings/overhead.
 * If the value is not a string, it returns the value itself.
 */
export function safeRender(value, fallback = '') {
  let content = value;
  if (content && typeof content === 'object' && content.value !== undefined && !React.isValidElement(content)) {
    content = content.value;
  }
  content = content !== undefined && content !== null && content !== '' ? content : fallback;
  if (typeof content !== 'string') {
    return content;
  }
  // Check if string contains HTML tags like <a ...> or <br> or <strong ...> or entities like &apos;
  const hasHtml = /<[a-z][\s\S]*>|&[a-z0-9#]+;/i.test(content);
  if (hasHtml) {
    return <span className="cms-rich-content inline" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}

/**
 * Safely resolves an image source that can be either an external URL string from CMS
 * or a local Next.js image import object as fallback.
 */
export function safeImage(value, fallback) {
  if (!value) return fallback;
  const val = typeof value === 'object' && value?.value !== undefined ? value.value : value;
  if (typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'))) {
    return val;
  }
  return fallback;
}

