import CMS from 'netlify-cms';

import HomePagePreview from './preview-templates/HomePagePreview';
import PracticalPagePreview from './preview-templates/PracticalPagePreview';
import SpeakerPreview from './preview-templates/SpeakerPreview';
import EventPreview from './preview-templates/EventPreview';
import StandPreview from './preview-templates/StandPreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('homepage', HomePagePreview);
CMS.registerPreviewTemplate('practical', PracticalPagePreview);
CMS.registerPreviewTemplate('speakers', SpeakerPreview);
CMS.registerPreviewTemplate('events', EventPreview);
CMS.registerPreviewTemplate('stands', StandPreview);
