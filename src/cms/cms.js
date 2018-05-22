import CMS from 'netlify-cms';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import HomePagePreview from './preview-templates/HomePagePreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('home', HomePagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
