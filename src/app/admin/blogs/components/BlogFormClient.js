"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Trash2,
  RefreshCw,
  Edit3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  X,
  Check,
  Upload,
  Image as ImageIcon,
  Minus,
  Plus,
  WrapText,
  Link as LinkIcon,
  Link2,
  Unlink,
  ExternalLink,
} from 'lucide-react';
import './editor.css';

export default function BlogFormClient({ 
  initialData = null, 
  isEdit = false, 
  apiBase = process.env.NEXT_PUBLIC_API_URL || '' 
}) {
  const router = useRouter();
  
  // Basic states
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [author, setAuthor] = useState(initialData?.author || 'Admin');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '');
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [readMinutes, setReadMinutes] = useState(initialData?.readMinutes || '');
  const [category, setCategory] = useState(initialData?.category || '');

  // SEO states
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [keywords, setKeywords] = useState(initialData?.keywords || '');

  // UI control states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'code'
  const [currentFormat, setCurrentFormat] = useState('p');
  const [currentFontSize, setCurrentFontSize] = useState('');
  
  // Media Library Modal states
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('cover'); // 'cover' | 'editor' | 'replace-image'
  const [mediaModalTab, setMediaModalTab] = useState('library'); // 'library' | 'url'
  const [inputUrl, setInputUrl] = useState('');

  // Inserted Image Management states
  const [selectedImageNode, setSelectedImageNode] = useState(null);
  const [imageToolbarPos, setImageToolbarPos] = useState(null);
  const [showImageEditModal, setShowImageEditModal] = useState(false);
  const [imageEditSrc, setImageEditSrc] = useState('');
  const [imageEditAlt, setImageEditAlt] = useState('');
  const [imageEditWidth, setImageEditWidth] = useState('100%');
  const [imageEditAlign, setImageEditAlign] = useState('center');
  const [imageEditWrap, setImageEditWrap] = useState(true);
  const [imageEditLink, setImageEditLink] = useState('');
  const [imageEditLinkNewTab, setImageEditLinkNewTab] = useState(true);

  // Link Modal states (for text and images)
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkOpenNewTab, setLinkOpenNewTab] = useState(true);
  const [isLinkingImage, setIsLinkingImage] = useState(false);
  const [activeLinkNode, setActiveLinkNode] = useState(null);

  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const savedRangeRef = useRef(null);

  // Selection range saving and restoring helpers
  const saveSelection = () => {
    if (typeof window !== 'undefined') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (
          editorRef.current &&
          (editorRef.current.contains(range.commonAncestorContainer) ||
           editorRef.current === range.commonAncestorContainer)
        ) {
          savedRangeRef.current = range.cloneRange();
        }
      }
    }
  };

  const restoreSelection = () => {
    if (typeof window !== 'undefined' && savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  const updateCurrentFormat = () => {
    saveSelection();
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    let node = sel.anchorNode;
    if (!node) return;
    if (node.nodeType === 3) node = node.parentNode;

    let tag = 'p';
    while (node && node !== editorRef.current) {
      const name = node.tagName?.toLowerCase();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote'].includes(name)) {
        tag = name;
        break;
      }
      node = node.parentNode;
    }
    setCurrentFormat(tag);
  };

  // Helper to extract clean HTML from editor without temporary selection classes
  const getCleanHtml = () => {
    if (!editorRef.current) return '';
    const clone = editorRef.current.cloneNode(true);
    const selectedImgs = clone.querySelectorAll('.selected-editor-image');
    selectedImgs.forEach((img) => {
      img.classList.remove('selected-editor-image');
      if (img.classList.length === 0) {
        img.removeAttribute('class');
      }
    });
    return clone.innerHTML;
  };

  // Sync contenteditable text with content state
  const handleEditorChange = () => {
    const clean = getCleanHtml();
    setContent(clean);
  };

  const handleEditorBlur = () => {
    saveSelection();
    handleEditorChange();
  };

  const deselectImage = () => {
    if (editorRef.current) {
      const prevs = editorRef.current.querySelectorAll('.selected-editor-image');
      prevs.forEach((p) => p.classList.remove('selected-editor-image'));
    }
    setSelectedImageNode(null);
    setImageToolbarPos(null);
  };

  const updateToolbarPosition = (imgNode) => {
    if (!imgNode || !editorRef.current) {
      setImageToolbarPos(null);
      return;
    }
    const editorRect = editorRef.current.getBoundingClientRect();
    const imgRect = imgNode.getBoundingClientRect();

    // Hide toolbar if image is scrolled out of editor view
    if (imgRect.bottom < editorRect.top || imgRect.top > editorRect.bottom) {
      setImageToolbarPos(null);
      return;
    }

    const top = imgRect.top - editorRect.top;
    const imgCenter = (imgRect.left - editorRect.left) + (imgRect.width / 2);

    // Get exact rendered toolbar width or fallback
    const tbWidth = toolbarRef.current?.offsetWidth || 490;
    const halfWidth = tbWidth / 2;
    const margin = 16; // 16px safe margin from editor edge

    // Clamp toolbar center so it never overflows past left or right boundaries
    let clampedLeft = imgCenter;
    if (editorRect.width > tbWidth + margin * 2) {
      const minCenter = halfWidth + margin;
      const maxCenter = editorRect.width - halfWidth - margin;
      clampedLeft = Math.max(minCenter, Math.min(imgCenter, maxCenter));
    } else {
      clampedLeft = editorRect.width / 2;
    }

    const tbHeight = toolbarRef.current?.offsetHeight || 42;
    const clampedTop = Math.max(6, top - (tbHeight + 10));

    // Pointer arrow position relative to toolbar
    const arrowX = Math.max(20, Math.min(imgCenter - (clampedLeft - halfWidth), tbWidth - 20));

    setImageToolbarPos({
      top: clampedTop,
      left: clampedLeft,
      arrowLeft: arrowX,
    });
  };

  const selectImage = (imgNode) => {
    if (!imgNode) return;
    if (editorRef.current) {
      const prevs = editorRef.current.querySelectorAll('.selected-editor-image');
      prevs.forEach((p) => p.classList.remove('selected-editor-image'));
    }

    imgNode.classList.add('selected-editor-image');
    setSelectedImageNode(imgNode);
    setImageEditSrc(imgNode.getAttribute('src') || '');
    setImageEditAlt(imgNode.getAttribute('alt') || '');

    // Detect if image is currently wrapped inside an anchor link
    const parentA = imgNode.closest('a');
    if (parentA) {
      setImageEditLink(parentA.getAttribute('href') || '');
      setImageEditLinkNewTab(parentA.getAttribute('target') === '_blank');
    } else {
      setImageEditLink('');
      setImageEditLinkNewTab(true);
    }

    // Detect current width
    const currentWidth = imgNode.style.width || imgNode.getAttribute('width') || '100%';
    setImageEditWidth(currentWidth || '100%');

    // Detect alignment and wrap
    let align = 'center';
    let wrap = true;
    const floatVal = imgNode.style.float;
    const marginL = imgNode.style.marginLeft;
    const marginR = imgNode.style.marginRight;

    if (floatVal === 'left') {
      align = 'left';
      wrap = true;
    } else if (floatVal === 'right') {
      align = 'right';
      wrap = true;
    } else if (marginL === 'auto' && marginR === 'auto') {
      align = 'center';
      wrap = false;
    } else if ((marginL === '0px' || marginL === '0') && marginR === 'auto') {
      align = 'left';
      wrap = false;
    } else if (marginL === 'auto' && (marginR === '0px' || marginR === '0')) {
      align = 'right';
      wrap = false;
    } else if (marginR === 'auto') {
      align = 'left';
      wrap = false;
    }
    setImageEditAlign(align);
    setImageEditWrap(wrap);

    updateToolbarPosition(imgNode);
  };

  // Keep floating toolbar anchored on scroll/resize
  useEffect(() => {
    const handleScrollOrResize = () => {
      if (selectedImageNode) {
        updateToolbarPosition(selectedImageNode);
      }
    };
    const editorEl = editorRef.current;
    if (editorEl) {
      editorEl.addEventListener('scroll', handleScrollOrResize, { passive: true });
    }
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      if (editorEl) editorEl.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [selectedImageNode]);

  // Recalculate toolbar clamp when image size, alignment, or wrap changes
  useEffect(() => {
    if (selectedImageNode) {
      const timer = setTimeout(() => {
        updateToolbarPosition(selectedImageNode);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [selectedImageNode, imageEditWidth, imageEditAlign, imageEditWrap]);

  // Easily increase or decrease size: 25% -> 50% -> 75% -> 100%
  const handleStepImageSize = (direction) => {
    if (!selectedImageNode) return;
    const current = (imageEditWidth || '100%').trim();
    let newWidth = '100%';

    if (current === 'auto') {
      newWidth = direction === 'decrease' ? '75%' : '100%';
    } else {
      const match = current.match(/^(\d+)%$/);
      if (match) {
        const val = parseInt(match[1], 10);
        if (direction === 'decrease') {
          if (val > 75) newWidth = '75%';
          else if (val > 50) newWidth = '50%';
          else if (val > 25) newWidth = '25%';
          else newWidth = '25%';
        } else {
          if (val < 50) newWidth = '50%';
          else if (val < 75) newWidth = '75%';
          else if (val < 100) newWidth = '100%';
          else newWidth = '100%';
        }
      } else {
        newWidth = direction === 'decrease' ? '50%' : '100%';
      }
    }
    applyImageWidth(newWidth);
  };

  // Delete / Remove Image
  const handleDeleteSelectedImage = () => {
    if (!selectedImageNode) return;
    const parentA = selectedImageNode.closest('a');
    if (parentA && parentA.childNodes.length === 1) {
      parentA.remove();
    } else {
      selectedImageNode.remove();
    }
    deselectImage();
    handleEditorChange();
    if (showImageEditModal) setShowImageEditModal(false);
  };

  // Replace Image
  const handleOpenReplaceMedia = () => {
    if (!selectedImageNode) return;
    setMediaTarget('replace-image');
    setMediaModalTab('library');
    setInputUrl('');
    setShowMediaModal(true);
  };

  // Quick Alignment with Independent Positioning & Text-Wrapping Control
  const applyImageAlignment = (alignType, overrideWrap = null) => {
    if (!selectedImageNode) return;

    let wrap = overrideWrap !== null
      ? overrideWrap
      : (alignType === 'center' ? false : (imageEditWrap !== undefined ? imageEditWrap : true));

    if (alignType === 'center') {
      wrap = false;
    }

    selectedImageNode.style.maxWidth = '100%';
    selectedImageNode.style.height = 'auto';

    if (alignType === 'center') {
      selectedImageNode.style.display = 'block';
      selectedImageNode.style.float = 'none';
      selectedImageNode.style.clear = 'both';
      selectedImageNode.style.marginLeft = 'auto';
      selectedImageNode.style.marginRight = 'auto';
      selectedImageNode.style.marginTop = '1.25rem';
      selectedImageNode.style.marginBottom = '1.25rem';
    } else if (alignType === 'left') {
      if (wrap) {
        selectedImageNode.style.display = 'block';
        selectedImageNode.style.float = 'left';
        selectedImageNode.style.clear = 'both'; // Clears any preceding images so each image remains independent
        selectedImageNode.style.marginLeft = '0';
        selectedImageNode.style.marginRight = '2.25rem';
        selectedImageNode.style.marginTop = '0.5rem';
        selectedImageNode.style.marginBottom = '1.5rem';
      } else {
        selectedImageNode.style.display = 'block';
        selectedImageNode.style.float = 'none';
        selectedImageNode.style.clear = 'both';
        selectedImageNode.style.marginLeft = '0';
        selectedImageNode.style.marginRight = 'auto';
        selectedImageNode.style.marginTop = '1.25rem';
        selectedImageNode.style.marginBottom = '1.25rem';
      }
    } else if (alignType === 'right') {
      if (wrap) {
        selectedImageNode.style.display = 'block';
        selectedImageNode.style.float = 'right';
        selectedImageNode.style.clear = 'both'; // Clears any preceding images so each image remains independent
        selectedImageNode.style.marginLeft = '2.25rem';
        selectedImageNode.style.marginRight = '0';
        selectedImageNode.style.marginTop = '0.5rem';
        selectedImageNode.style.marginBottom = '1.5rem';
      } else {
        selectedImageNode.style.display = 'block';
        selectedImageNode.style.float = 'none';
        selectedImageNode.style.clear = 'both';
        selectedImageNode.style.marginLeft = 'auto';
        selectedImageNode.style.marginRight = '0';
        selectedImageNode.style.marginTop = '1.25rem';
        selectedImageNode.style.marginBottom = '1.25rem';
      }
    } else if (alignType === 'full') {
      wrap = false;
      selectedImageNode.style.display = 'block';
      selectedImageNode.style.float = 'none';
      selectedImageNode.style.clear = 'both';
      selectedImageNode.style.width = '100%';
      selectedImageNode.style.maxWidth = '100%';
      selectedImageNode.style.marginLeft = 'auto';
      selectedImageNode.style.marginRight = 'auto';
      selectedImageNode.style.marginTop = '1.25rem';
      selectedImageNode.style.marginBottom = '1.25rem';
    }

    setImageEditAlign(alignType);
    setImageEditWrap(wrap);
    handleEditorChange();
    setTimeout(() => updateToolbarPosition(selectedImageNode), 20);
  };

  const handleToggleWrap = () => {
    if (!selectedImageNode) return;
    const currentAlign = imageEditAlign === 'center' ? 'left' : imageEditAlign;
    const newWrap = !imageEditWrap;
    applyImageAlignment(currentAlign, newWrap);
  };

  // Quick Width
  const applyImageWidth = (widthVal) => {
    if (!selectedImageNode) return;
    if (widthVal === 'auto') {
      selectedImageNode.style.width = '';
    } else {
      selectedImageNode.style.width = widthVal;
    }
    selectedImageNode.style.maxWidth = '100%';
    selectedImageNode.style.height = 'auto';
    setImageEditWidth(widthVal);
    handleEditorChange();
    setTimeout(() => updateToolbarPosition(selectedImageNode), 20);
  };

  // Helper to ensure clean URLs with protocol
  const cleanLinkUrl = (raw) => {
    const trimmed = (raw || '').trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('#')
    ) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  // Save Changes from Image Edit Modal
  const handleSaveImageModal = (e) => {
    e?.preventDefault();
    if (!selectedImageNode) return;

    if (imageEditSrc && imageEditSrc !== selectedImageNode.src) {
      selectedImageNode.src = imageEditSrc;
    }
    if (imageEditAlt) {
      selectedImageNode.setAttribute('alt', imageEditAlt);
    } else {
      selectedImageNode.removeAttribute('alt');
    }

    // Save Image Link Destination
    const cleanedImgLink = cleanLinkUrl(imageEditLink);
    let parentA = selectedImageNode.closest('a');
    if (cleanedImgLink) {
      if (parentA) {
        parentA.setAttribute('href', cleanedImgLink);
        if (imageEditLinkNewTab) {
          parentA.setAttribute('target', '_blank');
          parentA.setAttribute('rel', 'noopener noreferrer');
        } else {
          parentA.removeAttribute('target');
          parentA.removeAttribute('rel');
        }
      } else {
        const a = document.createElement('a');
        a.setAttribute('href', cleanedImgLink);
        a.className = 'blog-image-link';
        if (imageEditLinkNewTab) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
        selectedImageNode.parentNode.insertBefore(a, selectedImageNode);
        a.appendChild(selectedImageNode);
      }
    } else if (parentA) {
      parentA.parentNode.insertBefore(selectedImageNode, parentA);
      parentA.remove();
    }

    if (imageEditWidth === 'auto') {
      selectedImageNode.style.width = '';
    } else {
      selectedImageNode.style.width = imageEditWidth;
    }
    selectedImageNode.style.maxWidth = '100%';
    selectedImageNode.style.height = 'auto';

    applyImageAlignment(imageEditAlign, imageEditWrap);
    handleEditorChange();
    setShowImageEditModal(false);
    setTimeout(() => updateToolbarPosition(selectedImageNode), 30);
  };

  // Open Link Modal from Top Toolbar (for text selection or selected image)
  const handleOpenTopToolbarLink = (e) => {
    e?.preventDefault();
    if (selectedImageNode) {
      handleOpenImageLinkModal();
      return;
    }

    saveSelection();
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    let existingA = null;
    let selectedStr = '';

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      selectedStr = range.toString().trim();
      let node = range.commonAncestorContainer;
      if (node.nodeType === 3) node = node.parentNode;
      existingA = node ? node.closest('a') : null;
    }

    if (existingA) {
      setActiveLinkNode(existingA);
      setLinkUrl(existingA.getAttribute('href') || '');
      setLinkText(existingA.textContent || '');
      setLinkOpenNewTab(existingA.getAttribute('target') === '_blank');
    } else {
      setActiveLinkNode(null);
      setLinkUrl('');
      setLinkText(selectedStr);
      setLinkOpenNewTab(true);
    }

    setIsLinkingImage(false);
    setShowLinkModal(true);
  };

  // Open Link Modal directly for the currently selected image
  const handleOpenImageLinkModal = () => {
    if (!selectedImageNode) return;
    const parentA = selectedImageNode.closest('a');
    if (parentA) {
      setActiveLinkNode(parentA);
      setLinkUrl(parentA.getAttribute('href') || '');
      setLinkOpenNewTab(parentA.getAttribute('target') === '_blank');
    } else {
      setActiveLinkNode(null);
      setLinkUrl('');
      setLinkOpenNewTab(true);
    }
    setLinkText('');
    setIsLinkingImage(true);
    setShowLinkModal(true);
  };

  // Apply Link (Text or Image)
  const handleApplyLink = (e) => {
    e?.preventDefault();
    const finalUrl = cleanLinkUrl(linkUrl);
    if (!finalUrl) {
      alert('Please enter a destination URL');
      return;
    }

    if (isLinkingImage && selectedImageNode) {
      let a = selectedImageNode.closest('a');
      if (a) {
        a.setAttribute('href', finalUrl);
        if (linkOpenNewTab) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        } else {
          a.removeAttribute('target');
          a.removeAttribute('rel');
        }
      } else {
        a = document.createElement('a');
        a.setAttribute('href', finalUrl);
        a.className = 'blog-image-link';
        if (linkOpenNewTab) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
        selectedImageNode.parentNode.insertBefore(a, selectedImageNode);
        a.appendChild(selectedImageNode);
      }
      setImageEditLink(finalUrl);
      setImageEditLinkNewTab(linkOpenNewTab);
      handleEditorChange();
      setShowLinkModal(false);
      setTimeout(() => updateToolbarPosition(selectedImageNode), 20);
      return;
    }

    // Text / Content Element Linking
    if (activeLinkNode) {
      activeLinkNode.setAttribute('href', finalUrl);
      if (linkOpenNewTab) {
        activeLinkNode.setAttribute('target', '_blank');
        activeLinkNode.setAttribute('rel', 'noopener noreferrer');
      } else {
        activeLinkNode.removeAttribute('target');
        activeLinkNode.removeAttribute('rel');
      }
      if (linkText && linkText.trim() && linkText !== activeLinkNode.textContent) {
        activeLinkNode.textContent = linkText;
      }
      handleEditorChange();
      setShowLinkModal(false);
      return;
    }

    restoreSelection();
    if (typeof window !== 'undefined') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);

        if (range.collapsed) {
          const a = document.createElement('a');
          a.setAttribute('href', finalUrl);
          a.textContent = linkText.trim() || finalUrl;
          if (linkOpenNewTab) {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
          }
          range.insertNode(a);
          range.setStartAfter(a);
          range.setEndAfter(a);
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          document.execCommand('createLink', false, finalUrl);
          if (editorRef.current) {
            const allLinks = editorRef.current.querySelectorAll(`a[href="${finalUrl}"]`);
            allLinks.forEach((link) => {
              if (linkOpenNewTab) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
              } else {
                link.removeAttribute('target');
                link.removeAttribute('rel');
              }
              if (linkText && linkText.trim() && allLinks.length === 1 && link.textContent !== linkText) {
                link.textContent = linkText;
              }
            });
          }
        }
      }
    }

    handleEditorChange();
    saveSelection();
    setShowLinkModal(false);
  };

  // Remove Link / Unlink (Text or Image)
  const handleRemoveLink = () => {
    if (isLinkingImage && selectedImageNode) {
      const parentA = selectedImageNode.closest('a');
      if (parentA) {
        parentA.parentNode.insertBefore(selectedImageNode, parentA);
        parentA.remove();
        setImageEditLink('');
        handleEditorChange();
        setTimeout(() => updateToolbarPosition(selectedImageNode), 20);
      }
      setShowLinkModal(false);
      return;
    }

    if (activeLinkNode) {
      const parent = activeLinkNode.parentNode;
      if (parent) {
        while (activeLinkNode.firstChild) {
          parent.insertBefore(activeLinkNode.firstChild, activeLinkNode);
        }
        parent.removeChild(activeLinkNode);
      }
    } else {
      restoreSelection();
      document.execCommand('unlink', false, null);
    }

    handleEditorChange();
    saveSelection();
    setShowLinkModal(false);
  };

  // Editor Interaction Listeners
  const handleEditorClick = (e) => {
    const target = e.target;

    // Prevent accidental link navigation inside editor while authoring content unless Ctrl/Cmd is held
    const linkEl = target.closest('a');
    if (linkEl && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }

    if (target && target.tagName === 'IMG') {
      e.stopPropagation();
      selectImage(target);
    } else {
      deselectImage();
    }
  };

  const handleEditorDoubleClick = (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
      e.stopPropagation();
      selectImage(target);
    }
  };

  const handleEditorKeyDown = (e) => {
    if (selectedImageNode) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelectedImage();
      } else if (e.key === 'Escape') {
        deselectImage();
      }
    }
  };

  const handleMediaSelect = (url) => {
    if (mediaTarget === 'replace-image') {
      if (selectedImageNode) {
        selectedImageNode.src = url;
        setImageEditSrc(url);
        handleEditorChange();
        setTimeout(() => updateToolbarPosition(selectedImageNode), 50);
      }
    } else if (mediaTarget === 'editor') {
      restoreSelection();
      executeCommand('insertImage', url);
      setTimeout(() => {
        if (editorRef.current) {
          const imgs = editorRef.current.querySelectorAll(`img[src="${url}"]`);
          if (imgs.length > 0) {
            const newlyInserted = imgs[imgs.length - 1];
            newlyInserted.style.maxWidth = '100%';
            newlyInserted.style.height = 'auto';
            newlyInserted.style.display = 'block';
            newlyInserted.style.marginLeft = 'auto';
            newlyInserted.style.marginRight = 'auto';
            newlyInserted.style.marginTop = '1.25rem';
            newlyInserted.style.marginBottom = '1.25rem';
            newlyInserted.style.clear = 'both';
            newlyInserted.style.float = 'none';

            // If image was inserted inside a paragraph with other content, isolate it
            const parent = newlyInserted.parentElement;
            if (parent && parent.tagName === 'P' && parent.childNodes.length > 1) {
              const nextNodes = [];
              let sib = newlyInserted.nextSibling;
              while (sib) {
                const next = sib.nextSibling;
                nextNodes.push(sib);
                sib = next;
              }
              if (nextNodes.length > 0) {
                const newP = document.createElement('p');
                nextNodes.forEach((node) => newP.appendChild(node));
                if (parent.nextSibling) {
                  parent.parentNode.insertBefore(newP, parent.nextSibling);
                } else {
                  parent.parentNode.appendChild(newP);
                }
              }
            }

            // Ensure an editable line exists below the image so user can easily click and type
            const parentBlock = newlyInserted.closest('p, div, blockquote, li') || newlyInserted;
            if (!parentBlock.nextSibling && editorRef.current) {
              const nextP = document.createElement('p');
              nextP.innerHTML = '<br>';
              if (parentBlock.parentNode) {
                parentBlock.parentNode.insertBefore(nextP, parentBlock.nextSibling);
              }
            }

            selectImage(newlyInserted);
            handleEditorChange();
          }
        }
      }, 50);
    } else {
      setCoverImage(url);
    }
    setShowMediaModal(false);
  };

  // Prefill editor on load
  useEffect(() => {
    if (editorRef.current && initialData?.content) {
      editorRef.current.innerHTML = initialData.content;
    }
  }, [initialData]);

  // Set logged-in user name as default author if not editing and available
  useEffect(() => {
    if (!isEdit && typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user?.name) setAuthor(user.name);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isEdit]);

  // Handle title change and auto slug generation
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit && !slugTouched) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  };

  // Handle slug change allowing forward slashes without adding hyphens
  const handleSlugChange = (e) => {
    setSlugTouched(true);
    // Allow user to freely enter letters, numbers, hyphens, underscores, and forward slashes.
    // Strip only invalid characters without inserting any unwanted hyphens.
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9\-_/]/g, '');
    setSlug(val);
  };

  // Preview the full URL based on what user entered
  const getFullUrlPreview = (rawSlug) => {
    if (!rawSlug) return '';
    const s = rawSlug.trim().toLowerCase();
    if (s.startsWith('/blogs/')) {
      return s;
    }
    if (s.startsWith('blogs/')) {
      return '/' + s;
    }
    if (s.startsWith('/')) {
      return '/blogs' + s;
    }
    return '/blogs/' + s;
  };


  // Run document formatting commands
  const executeCommand = (command, value = null) => {
    if (typeof document !== 'undefined') {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      restoreSelection();
      document.execCommand(command, false, value);
      handleEditorChange();
      saveSelection();
    }
  };

  // Format block elements (h1-h6, p) reliably across browsers
  const applyBlockFormat = (tag) => {
    if (typeof document === 'undefined') return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();

    const cleanTag = tag.replace(/[<>]/g, '').toLowerCase();

    let success = false;
    try {
      success = document.execCommand('formatBlock', false, `<${cleanTag}>`);
    } catch (e) {
      success = false;
    }
    if (!success) {
      try {
        success = document.execCommand('formatBlock', false, cleanTag);
      } catch (e) {
        success = false;
      }
    }
    if (!success) {
      try {
        success = document.execCommand('formatBlock', false, cleanTag.toUpperCase());
      } catch (e) {
        success = false;
      }
    }

    handleEditorChange();
    saveSelection();
    updateCurrentFormat();
  };

  // Apply font size to selection or enclosing block
  const applyFontSize = (size) => {
    if (typeof document === 'undefined') return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    if (range.collapsed) {
      let node = range.startContainer;
      if (node.nodeType === 3) node = node.parentNode;
      if (node && node !== editorRef.current) {
        node.style.fontSize = size;
      }
    } else {
      try {
        document.execCommand('fontSize', false, '7');
        const fontTags = editorRef.current?.querySelectorAll('font[size="7"]');
        if (fontTags && fontTags.length > 0) {
          fontTags.forEach((font) => {
            const span = document.createElement('span');
            span.style.fontSize = size;
            span.innerHTML = font.innerHTML;
            font.parentNode?.replaceChild(span, font);
          });
        } else {
          const span = document.createElement('span');
          span.style.fontSize = size;
          span.appendChild(range.extractContents());
          range.insertNode(span);
        }
      } catch (e) {
        console.error('Error applying font size:', e);
      }
    }

    handleEditorChange();
    saveSelection();
  };

  // Handle visual vs HTML editor tab change
  const handleTabChange = (tab) => {
    if (tab === 'visual') {
      // Sync HTML code textarea edits back to contenteditable div
      setActiveTab('visual');
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = content;
        }
      }, 50);
    } else {
      deselectImage();
      handleEditorChange();
      setActiveTab('code');
    }
  };

  // Fetch media items for the Media Picker Modal
  const fetchMedia = async () => {
    try {
      setLoadingMedia(true);
      const res = await fetch(`${apiBase}/api/cms/media?websiteId=default&limit=60&search=${encodeURIComponent(mediaSearch)}`);
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Failed to fetch media library', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (showMediaModal) {
      fetchMedia();
    }
  }, [showMediaModal, mediaSearch]);

  // Upload image to Cloudinary directly from the blog form
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('websiteId', 'default');
      formData.append('folder', 'blogs');

      const res = await fetch(`${apiBase}/api/cms/media`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      if (data.media?.url) {
        handleMediaSelect(data.media.url);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Ensure content has latest clean editor HTML without temporary selection classes
    const finalContent = activeTab === 'visual' ? (getCleanHtml() || content) : content;

    if (!title) {
      setError('Title is required');
      return;
    }
    if (!finalContent || finalContent === '<br>' || finalContent === '<div><br></div>') {
      setError('Content is required');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    let cleanSlug = (slug || title).toString().trim().toLowerCase();
    if (cleanSlug.startsWith('/blogs/')) cleanSlug = cleanSlug.slice(7);
    else if (cleanSlug.startsWith('blogs/')) cleanSlug = cleanSlug.slice(6);
    else if (cleanSlug === '/blogs' || cleanSlug === 'blogs') cleanSlug = '';

    cleanSlug = cleanSlug.replace(/^\/+|\/+$/g, '');

    cleanSlug = cleanSlug
      .split('/')
      .map(seg => seg.replace(/[^a-z0-9\-_]/g, '').replace(/^-+|-+$/g, ''))
      .filter(Boolean)
      .join('/');

    if (!cleanSlug) {
      cleanSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const payload = {
      title,
      slug: cleanSlug,
      excerpt,
      content: finalContent,
      coverImage,
      author,
      tags: tagsArray,
      published,
      metaTitle,
      metaDescription,
      keywords,
      readMinutes: readMinutes ? parseInt(readMinutes, 10) : null,
      category: category || null,
    };

    setLoading(true);

    try {
      let res;
      if (isEdit) {
        payload.id = initialData._id;
        res = await fetch(`${apiBase}/api/blogs`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${apiBase}/api/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save blog post');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-5xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter blog title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Slug (URL path)
            </label>
            <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#084032] focus-within:border-[#084032] overflow-hidden bg-gray-50">
              <span className="px-3 py-2 text-gray-500 bg-gray-100 border-r border-gray-200 text-xs font-mono select-none flex items-center">
                /blogs/
              </span>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="e.g. consumer-electronics/computer"
                className="w-full px-3 py-2 text-sm outline-none bg-transparent font-mono"
              />
            </div>
            {slug && (
              <p className="text-[11px] text-gray-400 mt-1 font-mono truncate">
                Full URL: {getFullUrlPreview(slug)}
              </p>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Short Excerpt / Summary
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief overview of the blog post (shown on listing pages)..."
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
          />
        </div>

        {/* Cover Image URL & Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Cover Image
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Image URL (HTTPS)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => {
                setMediaTarget('cover');
                setMediaModalTab('library');
                setShowMediaModal(true);
              }}
              className="px-4 py-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-all"
            >
              Browse Library
            </button>
          </div>
          {coverImage && (
            <div className="mt-3 relative w-48 h-28 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={coverImage}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Content Rich Text Editor */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Content <span className="text-red-500">*</span>
            </label>
            
            {/* visual/code tabs */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => handleTabChange('visual')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  activeTab === 'visual' ? 'bg-white text-[#084032] shadow-sm' : 'text-gray-500 hover:text-black'
                }`}
              >
                Visual Editor
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('code')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  activeTab === 'code' ? 'bg-white text-[#084032] shadow-sm' : 'text-gray-500 hover:text-black'
                }`}
              >
                HTML Code
              </button>
            </div>
          </div>

          {activeTab === 'visual' ? (
            <div className="border border-gray-300 rounded-lg flex flex-col relative bg-white shadow-xs">
              <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-xs border-b border-gray-200 p-2.5 flex flex-wrap gap-1.5 items-center rounded-t-lg shadow-xs transition-shadow">
                {/* Style Dropdown */}
                <select
                  value={currentFormat}
                  onMouseDown={saveSelection}
                  onFocus={saveSelection}
                  onChange={(e) => {
                    const val = e.target.value;
                    applyBlockFormat(val);
                    setCurrentFormat(val);
                  }}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-semibold outline-none cursor-pointer text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-[#084032] mr-1"
                  title="Heading / Style"
                >
                  <option value="p">Normal Text</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                  <option value="h5">Heading 5</option>
                  <option value="h6">Heading 6</option>
                </select>

                {/* Font Size Dropdown */}
                <select
                  value={currentFontSize}
                  onMouseDown={saveSelection}
                  onFocus={saveSelection}
                  onChange={(e) => {
                    const size = e.target.value;
                    if (size) {
                      applyFontSize(size);
                    }
                    setCurrentFontSize(size);
                  }}
                  className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs font-semibold outline-none cursor-pointer text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-[#084032] mr-1"
                  title="Font Size"
                >
                  <option value="">Font Size</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px (Normal)</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px (Large)</option>
                  <option value="28px">28px</option>
                  <option value="32px">32px (Huge)</option>
                </select>

                <div className="h-5 w-px bg-gray-300 mx-1" />

                {/* B I U Buttons */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                  className="p-1.5 text-xs font-bold bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center min-w-8 h-8"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                  className="p-1.5 text-xs italic bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center min-w-8 h-8"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                  className="p-1.5 text-xs underline bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center min-w-8 h-8"
                  title="Underline"
                >
                  U
                </button>

                <div className="h-5 w-px bg-gray-300 mx-1" />

                {/* List Buttons */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Bullet List"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('insertOrderedList'); }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Numbered List"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6h1v4"></path>
                    <path d="M4 10h2"></path>
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                  </svg>
                </button>

                <div className="h-5 w-px bg-gray-300 mx-1" />

                {/* Alignment Buttons */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Align Left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="17" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Align Center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="18" y1="10" x2="6" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="18" y1="18" x2="6" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyRight'); }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-gray-750 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Align Right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="21" y1="10" x2="7" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg>
                </button>

                <div className="h-5 w-px bg-gray-300 mx-1" />

                {/* Media Buttons */}
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    saveSelection();
                    setMediaTarget('editor');
                    setMediaModalTab('library');
                    setInputUrl('');
                    setShowMediaModal(true);
                  }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-[#084032] shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Insert Image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const url = prompt('Enter YouTube Video URL:');
                    if (url) {
                      let embedUrl = url;
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                      const match = url.match(regExp);
                      if (match && match[2].length === 11) {
                        embedUrl = `https://www.youtube.com/embed/${match[2]}`;
                      }
                      const iframeHtml = `<div class="aspect-video w-full my-4 relative overflow-hidden rounded-lg"><iframe src="${embedUrl}" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen></iframe></div>`;
                      executeCommand('insertHTML', iframeHtml);
                    }
                  }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-[#084032] shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Insert YouTube Video"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </button>
                <button
                  type="button"
                  onMouseDown={handleOpenTopToolbarLink}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-100 text-[#084032] shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Insert or Edit Link (Ctrl+K or click)"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleRemoveLink();
                  }}
                  className="p-1.5 bg-white border border-gray-200 rounded hover:bg-red-50 text-red-600 shadow-xs cursor-pointer flex items-center justify-center w-8 h-8"
                  title="Remove Link (Unlink)"
                >
                  <Unlink className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('removeFormat'); }}
                  className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-red-50 text-red-600 shadow-xs ml-auto cursor-pointer font-semibold"
                  title="Clear formatting"
                >
                  Clear
                </button>
              </div>

              <div className="relative w-full">
                {/* Image Management Toolbar directly above selected image */}
                {selectedImageNode && imageToolbarPos && (
                  <div
                    ref={toolbarRef}
                    style={{
                      position: 'absolute',
                      top: `${imageToolbarPos.top}px`,
                      left: `${imageToolbarPos.left}px`,
                      transform: 'translateX(-50%)',
                      zIndex: 30,
                      maxWidth: 'calc(100% - 24px)',
                    }}
                    className="bg-gray-900/95 text-white backdrop-blur-md px-2 py-1 rounded-xl shadow-2xl flex items-center gap-1 text-xs border border-gray-700/80 animate-fadeInToolbar pointer-events-auto select-none"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {/* Size Selector with Decrease [-] / Increase [+] buttons */}
                    <div className="flex items-center bg-gray-800/90 rounded-lg border border-gray-700/80 p-0.5 shadow-inner">
                      <button
                        type="button"
                        onClick={() => handleStepImageSize('decrease')}
                        className="p-1 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Decrease Size (-)"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="relative flex items-center px-1">
                        <select
                          value={imageEditWidth}
                          onChange={(e) => applyImageWidth(e.target.value)}
                          className="bg-transparent text-white text-xs font-semibold px-1 py-0.5 outline-none cursor-pointer border-none text-center appearance-none pr-3"
                          title="Select Image Size"
                        >
                          <option value="100%" className="bg-gray-800 text-white">100%</option>
                          <option value="75%" className="bg-gray-800 text-white">75%</option>
                          <option value="50%" className="bg-gray-800 text-white">50%</option>
                          <option value="25%" className="bg-gray-800 text-white">25%</option>
                          <option value="auto" className="bg-gray-800 text-white">Original</option>
                        </select>
                        <span className="pointer-events-none absolute right-0.5 text-gray-400 text-[9px]">▼</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStepImageSize('increase')}
                        className="p-1 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Increase Size (+)"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="h-4 w-px bg-gray-700 mx-0.5" />

                    {/* Replace Button */}
                    <button
                      type="button"
                      onClick={handleOpenReplaceMedia}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-600 transition-colors font-medium cursor-pointer"
                      title="Replace selected image with another"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Replace</span>
                    </button>

                    <div className="h-4 w-px bg-gray-700 mx-0.5" />

                    {/* Alignment Shortcuts */}
                    <div className="flex items-center gap-0.5 bg-gray-800/80 rounded-lg p-0.5 border border-gray-700/60">
                      <button
                        type="button"
                        onClick={() => applyImageAlignment('left', true)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          imageEditAlign === 'left' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                        }`}
                        title="Align Left (Wrap text on right)"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => applyImageAlignment('center', false)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          imageEditAlign === 'center' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                        }`}
                        title="Align Center (Full-width block)"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => applyImageAlignment('right', true)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          imageEditAlign === 'right' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                        }`}
                        title="Align Right (Wrap text on left)"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="h-4 w-px bg-gray-700 mx-0.5" />

                    {/* Text Wrap Toggle */}
                    <button
                      type="button"
                      onClick={handleToggleWrap}
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors font-medium cursor-pointer ${
                        imageEditWrap && imageEditAlign !== 'center'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                      title={
                        imageEditWrap && imageEditAlign !== 'center'
                          ? 'Text Wrap: ON (Text flows beside image). Click to disable wrapping.'
                          : 'Text Wrap: OFF (Content stays below image). Click to allow text wrapping.'
                      }
                    >
                      <WrapText className="w-3.5 h-3.5" />
                      <span>{imageEditWrap && imageEditAlign !== 'center' ? 'Wrap: ON' : 'Wrap: OFF'}</span>
                    </button>

                    <div className="h-4 w-px bg-gray-700 mx-0.5" />

                    {/* Image Link Button */}
                    <button
                      type="button"
                      onClick={handleOpenImageLinkModal}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-medium cursor-pointer ${
                        imageEditLink
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                      title={
                        imageEditLink
                          ? `Linked to: ${imageEditLink} (Click to edit or remove link)`
                          : 'Add hyperlink to this image'
                      }
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>{imageEditLink ? 'Linked' : 'Link'}</span>
                    </button>

                    <div className="h-4 w-px bg-gray-700 mx-0.5" />

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={handleDeleteSelectedImage}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium cursor-pointer shadow-xs"
                      title="Remove / Delete selected image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>

                    {/* Deselect Button */}
                    <button
                      type="button"
                      onClick={deselectImage}
                      className="p-1 rounded-md hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer ml-0.5"
                      title="Deselect image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Small bottom caret pointing to image */}
                    <div
                      style={{
                        left: imageToolbarPos.arrowLeft !== undefined ? `${imageToolbarPos.arrowLeft}px` : '50%',
                      }}
                      className="absolute top-full -translate-x-1/2 -mt-px w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900/95 pointer-events-none transition-all duration-150"
                    />
                  </div>
                )}

                <div
                  ref={editorRef}
                  contentEditable
                  onClick={handleEditorClick}
                  onDoubleClick={handleEditorDoubleClick}
                  onKeyDown={handleEditorKeyDown}
                  onBlur={handleEditorBlur}
                  onInput={() => {
                    handleEditorChange();
                    updateCurrentFormat();
                  }}
                  onKeyUp={updateCurrentFormat}
                  onMouseUp={updateCurrentFormat}
                  className="w-full p-4 pt-4 min-h-[380px] max-h-[550px] outline-none prose max-w-none focus:ring-0 overflow-y-auto resize-y blog-editor-scroll rounded-b-lg"
                  style={{ direction: 'left', textAlign: 'left' }}
                />
              </div>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste HTML source code here..."
              rows={16}
              className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none min-h-[380px] max-h-[550px] overflow-y-auto resize-y blog-editor-scroll"
            />
          )}
        </div>

        {/* Category & Read Minutes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blog Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Technology, Tutorials, Insights"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Read Minutes
            </label>
            <input
              type="number"
              min="0"
              value={readMinutes}
              onChange={(e) => setReadMinutes(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
          </div>
        </div>

        {/* Author & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Admin or Writer Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Technology, Business, Excel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
            />
          </div>
        </div>

        {/* SEO Management Panel */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          <div className="p-4 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700 flex justify-between items-center">
            <span>SEO Meta Configuration (Optional)</span>
            <span className="text-xs text-gray-400">Controls head tags for search engines</span>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Defaults to blog title if left blank"
                className="w-full bg-white px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#084032]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="A compelling, keyword-rich summary of less than 160 characters for search listings..."
                rows={2}
                className="w-full bg-white px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#084032]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. excel dashboard, crown excel templates, reporting"
                className="w-full bg-white px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#084032]"
              />
            </div>
          </div>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 accent-[#084032] border-gray-300 rounded focus:ring-[#084032]"
          />
          <label htmlFor="published" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
            Publish Post immediately (uncheck to save as draft)
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="px-5 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg shadow disabled:opacity-60 transition-all cursor-pointer"
          >
            {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>

      {/* Media Library Selection Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {mediaTarget === 'editor'
                    ? 'Insert Image'
                    : mediaTarget === 'replace-image'
                    ? 'Replace Selected Image'
                    : 'Select Cover Image'}
                </h3>
                {mediaTarget === 'replace-image' && (
                  <p className="text-xs text-[#147A5F] mt-0.5 font-medium">
                    Select an image from the library, upload a new file, or enter a URL to replace the current image in-place.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="text-gray-500 hover:text-black font-bold text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6">
              <button
                type="button"
                onClick={() => setMediaModalTab('library')}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                  mediaModalTab === 'library'
                    ? 'border-[#084032] text-[#084032]'
                    : 'border-transparent text-gray-550 hover:text-[#084032]'
                }`}
              >
                Media Library
              </button>
              <button
                type="button"
                onClick={() => setMediaModalTab('url')}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                  mediaModalTab === 'url'
                    ? 'border-[#084032] text-[#084032]'
                    : 'border-transparent text-gray-550 hover:text-[#084032]'
                }`}
              >
                {mediaTarget === 'replace-image' ? 'Replace by URL' : 'Insert from URL'}
              </button>
            </div>

            {mediaModalTab === 'url' ? (
              <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex items-center justify-center min-h-[350px]">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-lg w-full space-y-4">
                  <h4 className="text-sm font-bold text-gray-800">
                    {mediaTarget === 'replace-image' ? 'Replace Image with External URL' : 'Insert Image from External URL'}
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Image Link (HTTPS)</label>
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setInputUrl('')}
                      className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm transition-all"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      disabled={!inputUrl}
                      onClick={() => {
                        if (inputUrl) {
                          handleMediaSelect(inputUrl);
                          setInputUrl('');
                        }
                      }}
                      className="px-5 py-2 bg-[#084032] hover:bg-[#00a63e] disabled:opacity-50 text-white font-semibold rounded-lg text-sm shadow transition-all cursor-pointer"
                    >
                      {mediaTarget === 'replace-image' ? 'Replace Image' : 'Insert Image'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Upload & Search controls */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      placeholder="Search media..."
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#084032] outline-none"
                    />
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <label className="cursor-pointer px-4 py-2 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg text-sm transition-all text-center">
                      {uploadingImage ? 'Uploading...' : mediaTarget === 'replace-image' ? 'Upload Replacement' : 'Upload New Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Media Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-[300px]">
                  {loadingMedia ? (
                    <div className="flex items-center justify-center h-48">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#084032]"></div>
                    </div>
                  ) : mediaList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                      <span className="mb-2">No media found.</span>
                      <span className="text-xs">Upload images using the upload button above.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {mediaList.map((media) => (
                        <div
                          key={media._id}
                          onClick={() => {
                            handleMediaSelect(media.url);
                          }}
                          className="group cursor-pointer border border-gray-200 hover:border-[#084032] rounded-lg overflow-hidden bg-white shadow-xs hover:shadow transition-all relative flex flex-col"
                        >
                          <div className="w-full aspect-square bg-gray-100 relative overflow-hidden">
                            <img
                              src={media.thumbnailUrl || media.url}
                              alt={media.alt || media.originalName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            />
                          </div>
                          <div className="p-2 border-t border-gray-100 text-[10px] text-gray-500 truncate">
                            {media.originalName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-150 text-gray-700 font-semibold rounded-lg text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage & Update Inserted Image Modal */}
      {showImageEditModal && selectedImageNode && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden border border-gray-200 animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-[#084032] rounded-lg">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    Manage Inserted Image
                  </h3>
                  <p className="text-xs text-gray-500">
                    Replace, update attributes, resize, or delete this image
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowImageEditModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-xl p-1 rounded-md hover:bg-gray-150 transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveImageModal} className="p-6 space-y-5 overflow-y-auto max-h-[calc(85vh-130px)]">
              {/* Image Preview & Quick Actions */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-28 h-24 rounded-lg border border-emerald-300 bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                  <img
                    src={imageEditSrc || selectedImageNode.getAttribute('src') || ''}
                    alt={imageEditAlt || 'Preview'}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                  <div className="text-xs font-semibold text-gray-700">Quick Image Actions:</div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        setShowImageEditModal(false);
                        handleOpenReplaceMedia();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#084032] hover:bg-[#062e24] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Replace / Change
                    </button>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-gray-100 text-[#084032] border border-emerald-300 rounded-lg shadow-xs transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload New
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            setUploadingImage(true);
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('websiteId', 'default');
                            formData.append('folder', 'blogs');
                            const res = await fetch(`${apiBase}/api/cms/media`, {
                              method: 'POST',
                              body: formData,
                            });
                            if (!res.ok) throw new Error('Upload failed');
                            const data = await res.json();
                            if (data.media?.url) {
                              setImageEditSrc(data.media.url);
                              if (selectedImageNode) {
                                selectedImageNode.src = data.media.url;
                                handleEditorChange();
                              }
                            }
                          } catch (err) {
                            alert('Upload failed: ' + err.message);
                          } finally {
                            setUploadingImage(false);
                          }
                        }}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleDeleteSelectedImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                  {uploadingImage && (
                    <p className="text-xs text-emerald-700 animate-pulse font-medium">Uploading replacement image...</p>
                  )}
                </div>
              </div>

              {/* Image Source URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Image Source URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageEditSrc}
                    onChange={(e) => setImageEditSrc(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Direct image URL or CDN link. You can also paste an external image URL here.
                </p>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alt Text (Alternative Description)
                </label>
                <input
                  type="text"
                  value={imageEditAlt}
                  onChange={(e) => setImageEditAlt(e.target.value)}
                  placeholder="e.g. Lenovo ThinkPad laptop wholesale supplier in Dubai"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Important for SEO and screen readers. Accurately describe what is shown in the image.
                </p>
              </div>

              {/* Hyperlink Destination URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hyperlink Destination URL (Optional)
                </label>
                <input
                  type="text"
                  value={imageEditLink}
                  onChange={(e) => setImageEditLink(e.target.value)}
                  placeholder="e.g. https://crownexcel.ae/products or /blogs/your-post"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none"
                />
                <div className="flex items-center gap-2 mt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={imageEditLinkNewTab}
                      onChange={(e) => setImageEditLinkNewTab(e.target.checked)}
                      className="w-4 h-4 text-[#084032] border-gray-300 rounded focus:ring-[#084032]"
                    />
                    <span>Open link in new tab (target="_blank")</span>
                  </label>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  When visitors click this image on your published blog, they will open this URL.
                </p>
              </div>

              {/* Alignment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Alignment & Positioning
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setImageEditAlign('center')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageEditAlign === 'center'
                        ? 'border-[#084032] bg-emerald-50 text-[#084032] ring-1 ring-[#084032]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <AlignCenter className="w-4 h-4 mb-1" />
                    Center
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageEditAlign('left')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageEditAlign === 'left'
                        ? 'border-[#084032] bg-emerald-50 text-[#084032] ring-1 ring-[#084032]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <AlignLeft className="w-4 h-4 mb-1" />
                    Left
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageEditAlign('right')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageEditAlign === 'right'
                        ? 'border-[#084032] bg-emerald-50 text-[#084032] ring-1 ring-[#084032]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <AlignRight className="w-4 h-4 mb-1" />
                    Right
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageEditAlign('full')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageEditAlign === 'full'
                        ? 'border-[#084032] bg-emerald-50 text-[#084032] ring-1 ring-[#084032]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Maximize2 className="w-4 h-4 mb-1" />
                    Full Width
                  </button>
                </div>
              </div>

              {/* Text Wrapping Option in Modal */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Text Wrapping
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={imageEditWrap && imageEditAlign !== 'center'}
                      disabled={imageEditAlign === 'center'}
                      onChange={(e) => setImageEditWrap(e.target.checked)}
                      className="w-4 h-4 text-[#084032] border-gray-300 rounded focus:ring-[#084032]"
                    />
                    <span>Allow text to flow alongside image (Left / Right)</span>
                  </label>
                </div>
              </div>

              {/* Display Size / Width */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Display Width
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    { label: 'Full (100%)', val: '100%' },
                    { label: 'Large (75%)', val: '75%' },
                    { label: 'Medium (50%)', val: '50%' },
                    { label: 'Small (25%)', val: '25%' },
                    { label: 'Original Size', val: 'auto' },
                  ].map((sz) => (
                    <button
                      key={sz.val}
                      type="button"
                      onClick={() => setImageEditWidth(sz.val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        imageEditWidth === sz.val
                          ? 'border-[#084032] bg-emerald-50 text-[#084032] ring-1 ring-[#084032]'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Custom width:</span>
                  <input
                    type="text"
                    value={imageEditWidth}
                    onChange={(e) => setImageEditWidth(e.target.value)}
                    placeholder="e.g. 600px, 80%, auto"
                    className="w-36 px-2.5 py-1 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#084032] outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDeleteSelectedImage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold rounded-lg text-sm transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Image
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImageEditModal(false)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg text-sm shadow transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Save & Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Dedicated Hyperlink Modal for Text and Images */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full flex flex-col overflow-hidden border border-gray-200 animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-[#084032] rounded-lg">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {isLinkingImage
                      ? (imageEditLink ? 'Edit Image Link' : 'Add Link to Image')
                      : (activeLinkNode ? 'Edit Hyperlink' : 'Insert Hyperlink')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isLinkingImage
                      ? 'Destination URL when visitors click this image'
                      : 'Create or update a clickable hyperlink'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-xl p-1 rounded-md hover:bg-gray-150 transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleApplyLink} className="p-6 space-y-4">
              {/* Linked Image Thumbnail Preview */}
              {isLinkingImage && selectedImageNode && (
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-150 flex items-center gap-3">
                  <div className="w-16 h-14 rounded-md border border-emerald-300 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={selectedImageNode.getAttribute('src') || ''}
                      alt="Thumbnail"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-900 block">Selected Image</span>
                    <span>Clicking this image on the published blog will open the link below.</span>
                  </div>
                </div>
              )}

              {/* Text to Display (Only for Text Links) */}
              {!isLinkingImage && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Display Text
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="e.g. Learn more about laptop wholesale"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    The text that will appear hyperlinked in your blog post.
                  </p>
                </div>
              )}

              {/* Destination URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. https://crownexcel.ae/products or /blogs/post-slug"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Supports external websites (https://...), internal paths (/blogs/...), or mailto:.
                </p>
              </div>

              {/* Target New Tab Option */}
              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={linkOpenNewTab}
                    onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                    className="w-4 h-4 text-[#084032] border-gray-300 rounded focus:ring-[#084032]"
                  />
                  <span>Open link in new tab (target="_blank")</span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                {((isLinkingImage && imageEditLink) || (!isLinkingImage && activeLinkNode)) ? (
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold rounded-lg text-xs transition-all cursor-pointer"
                    title="Remove Link"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    Remove Link
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-lg text-xs transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {activeLinkNode || (isLinkingImage && imageEditLink) ? 'Save Link' : 'Add Link'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
