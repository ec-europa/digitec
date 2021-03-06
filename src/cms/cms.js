import CMS from 'netlify-cms-app';

import HomePagePreview from './preview-templates/HomePagePreview';
import PracticalPagePreview from './preview-templates/PracticalPagePreview';
import SpeakerPreview from './preview-templates/SpeakerPreview';
import TeamPreview from './preview-templates/TeamPreview';
import EventPreview from './preview-templates/EventPreview';
import StandPreview from './preview-templates/StandPreview';

CMS.registerPreviewTemplate('homepage', HomePagePreview);
CMS.registerPreviewTemplate('practical', PracticalPagePreview);
CMS.registerPreviewTemplate('speakers', SpeakerPreview);
CMS.registerPreviewTemplate('teams', TeamPreview);
CMS.registerPreviewTemplate('events', EventPreview);
CMS.registerPreviewTemplate('stands', StandPreview);
