import CMS from 'netlify-cms';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import HomePagePreview from './preview-templates/HomePagePreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import SpeakerPreview from './preview-templates/SpeakerPreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('homepage', HomePagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('speakers', SpeakerPreview);
