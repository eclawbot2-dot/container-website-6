export type Lang = 'en' | 'ar';

export type Dict = {
  dir: 'ltr' | 'rtl';
  nav: { about: string; lineup: string; visit: string; tickets: string };
  langToggle: { label: string; switchTo: string };
  // Manifest / terminal chrome
  terminal: {
    docId: string; // "MANIFEST / BILL OF LADING"
    port: string; // "PORT OF" label
    portValue: string;
    status: string; // "STATUS" label
    statusValue: string; // "LIVE OPS"
    coords: string; // "COORDS" label
  };
  hero: {
    kicker: string;
    title: string;
    tagline: string;
    cta: string;
    instagram: string;
    boarding: string; // departures-board flavor line
  };
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    stats: { value: string; label: string }[];
  };
  lineup: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ticketsCta: string;
    detailsCta: string; // "Details" — opens the event detail page
    tba: string;
    note: string;
    // Manifest column headers
    cols: { ref: string; vessel: string; etd: string; bay: string; status: string; action: string };
    statusBoarding: string; // "BOARDING"
    statusPending: string; // "MANIFEST PENDING"
  };
  // Event detail page ("vessel detail / manifest entry")
  event: {
    docId: string; // "VESSEL DETAIL / MANIFEST ENTRY"
    back: string; // "Back to manifest"
    artistLabel: string;
    dateLabel: string;
    timeLabel: string;
    venueLabel: string;
    locationLabel: string;
    genreLabel: string;
    bioLabel: string;
    venueName: string;
    venueLine: string;
    timeTba: string; // "Time to be announced"
    subjectToChange: string; // "Lineup subject to change"
    ticketsCta: string;
    ticketsSoon: string; // placeholder label when no ticket URL
    mapCta: string;
    notFound: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    addressTitle: string;
    address: string;
    gettingThereTitle: string;
    gettingThere: string;
    hoursTitle: string;
    hours: string;
    mapCta: string;
    entryTitle: string;
    entry: string;
  };
  footer: {
    tagline: string;
    follow: string;
    contact: string;
    rights: string;
    eventsNote: string;
    endOfManifest: string; // "END OF MANIFEST"
    igSoon: string; // placeholder when no verified IG handle
    contactSoon: string; // placeholder when no live mailbox
  };
  months: string[];
  weekdays: string[];
};

export const dict: Record<Lang, Dict> = {
  en: {
    dir: 'ltr',
    nav: { about: 'About', lineup: 'Manifest', visit: 'Visit', tickets: 'Tickets' },
    langToggle: { label: 'العربية', switchTo: 'Switch to Arabic' },
    terminal: {
      docId: 'CARGO MANIFEST / BILL OF LADING',
      port: 'PORT OF',
      portValue: 'JEDDAH · RED SEA',
      status: 'STATUS',
      statusValue: 'LIVE OPS',
      coords: 'COORDS',
    },
    hero: {
      kicker: 'Jeddah · Red Sea Port',
      title: 'THE CONTAINER',
      tagline:
        'Raw, industrial electronic music on the Red Sea. Steel, concrete, water and sound — where shipping containers become a stage from sunset to late.',
      cta: 'View manifest',
      instagram: 'Follow on Instagram',
      boarding: 'NOW BOARDING · SUNSET → LATE',
    },
    about: {
      eyebrow: 'The Venue',
      title: 'A working port, repurposed for sound.',
      body: [
        'The Container lives inside Shams Container Terminal — a working shipping-container terminal on the Jeddah waterfront, reborn as a venue for techno and house. Towering stacks of steel, raw concrete and the open Red Sea set the stage for international and regional artists.',
        'It is industrial by nature: open-air and warehouse spaces, port lighting, and a sound system built for the long arc from golden-hour sunset to the small hours. No gloss, no pretense — just powerful music in a space that was never meant to be pretty, and is all the more striking for it.',
      ],
      stats: [
        { value: 'Red Sea', label: 'Waterfront port setting' },
        { value: 'Techno · House', label: 'International & regional DJs' },
        { value: 'Sunset → Late', label: 'Open-air & warehouse floors' },
      ],
    },
    lineup: {
      eyebrow: 'Upcoming',
      title: 'Events Manifest',
      subtitle: 'World-class techno and house, on the edge of the Red Sea.',
      ticketsCta: 'Buy tickets',
      detailsCta: 'Details',
      tba: 'More to be announced',
      note: 'Lineup and dates are subject to change. Ticketing and announcements will be published here as confirmed.',
      cols: { ref: 'REF', vessel: 'VESSEL / ARTIST', etd: 'ETD / DATE', bay: 'BAY / STAGE', status: 'STATUS', action: '' },
      statusBoarding: 'BOARDING',
      statusPending: 'MANIFEST PENDING',
    },
    event: {
      docId: 'VESSEL DETAIL / MANIFEST ENTRY',
      back: 'Back to manifest',
      artistLabel: 'VESSEL / ARTIST',
      dateLabel: 'ETD / DATE',
      timeLabel: 'DOORS / TIME',
      venueLabel: 'BERTH / VENUE',
      locationLabel: 'LOCATION',
      genreLabel: 'CARGO / GENRE',
      bioLabel: 'MANIFEST NOTES',
      venueName: 'The Container',
      venueLine: 'Shams Container Terminal, Al Moulysaa district, Jeddah port area, Red Sea coast, Saudi Arabia.',
      timeTba: 'Time to be announced',
      subjectToChange: 'Lineup subject to change.',
      ticketsCta: 'BOOK PASSAGE',
      ticketsSoon: 'Tickets — on sale soon',
      mapCta: 'Open in Maps',
      notFound: 'Manifest entry not found.',
    },
    visit: {
      eyebrow: 'Plan your night',
      title: 'Visit',
      addressTitle: 'Location',
      address:
        'Shams Container Terminal, Al Moulysaa district, Jeddah port area, Red Sea coast, Saudi Arabia.',
      gettingThereTitle: 'Getting there',
      gettingThere:
        'The venue sits inside the industrial port zone on the waterfront. We recommend arriving by car or ride-hailing; on-site directions and the entry gate are shared with each event announcement on Instagram.',
      hoursTitle: 'Timing',
      hours:
        'Doors and set times are published per event. Sets typically run from late afternoon through the night.',
      mapCta: 'Open in Maps',
      entryTitle: 'Entry',
      entry:
        'The Container hosts licensed live electronic-music events. Entry is for ticket-holders; please bring valid ID. Event-specific entry details are confirmed at announcement.',
    },
    footer: {
      tagline: "Jeddah's industrial techno & house venue on the Red Sea port.",
      follow: 'Follow',
      contact: 'Contact',
      rights: 'All rights reserved.',
      eventsNote: 'Live electronic music events · Jeddah, Saudi Arabia',
      endOfManifest: 'END OF MANIFEST',
      igSoon: 'Instagram — coming soon',
      contactSoon: 'Contact details — coming soon',
    },
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  ar: {
    dir: 'rtl',
    nav: { about: 'عن المكان', lineup: 'البيان', visit: 'الزيارة', tickets: 'التذاكر' },
    langToggle: { label: 'English', switchTo: 'التبديل إلى الإنجليزية' },
    terminal: {
      docId: 'بيان الشحن / سند الشحن',
      port: 'ميناء',
      portValue: 'جدة · البحر الأحمر',
      status: 'الحالة',
      statusValue: 'تشغيل مباشر',
      coords: 'الإحداثيات',
    },
    hero: {
      kicker: 'جدة · ميناء البحر الأحمر',
      title: 'ذا كونتينر',
      tagline:
        'موسيقى إلكترونية صناعية خام على ساحل البحر الأحمر. فولاذ وخرسانة وماء وصوت — حيث تتحوّل حاويات الشحن إلى مسرح من غروب الشمس حتى وقت متأخر من الليل.',
      cta: 'استعرض البيان',
      instagram: 'تابعنا على إنستغرام',
      boarding: 'الصعود الآن · الغروب ← وقت متأخر',
    },
    about: {
      eyebrow: 'المكان',
      title: 'ميناء عامل، أُعيد تصميمه من أجل الصوت.',
      body: [
        'يقع ذا كونتينر داخل محطة شمس للحاويات — محطة حاويات شحن عاملة على واجهة جدة البحرية، أُعيد إحياؤها كمكان لموسيقى التكنو والهاوس. أكوام شاهقة من الفولاذ، وخرسانة خام، والبحر الأحمر المفتوح، تشكّل خلفية لعروض فنانين عالميين وإقليميين.',
        'إنه مكان صناعي بطبعه: مساحات مفتوحة وأخرى مغلقة على طراز المستودعات، وإضاءة الميناء، ونظام صوت مصمَّم للامتداد الطويل من غروب الشمس الذهبي حتى ساعات الفجر الأولى. لا تنميق ولا تكلّف — مجرد موسيقى قوية في مساحة لم تُصمَّم يومًا لتكون جميلة، وهي بذلك أكثر تأثيرًا.',
      ],
      stats: [
        { value: 'البحر الأحمر', label: 'موقع على واجهة الميناء البحرية' },
        { value: 'تكنو · هاوس', label: 'منسّقو أغانٍ عالميون وإقليميون' },
        { value: 'الغروب ← وقت متأخر', label: 'مساحات مفتوحة ومستودعات' },
      ],
    },
    lineup: {
      eyebrow: 'القادم',
      title: 'بيان الفعاليات',
      subtitle: 'تكنو وهاوس على أعلى مستوى، على حافة البحر الأحمر.',
      ticketsCta: 'اشترِ التذاكر',
      detailsCta: 'التفاصيل',
      tba: 'سيُعلن عن المزيد',
      note: 'العروض والتواريخ قابلة للتغيير. سيتم نشر التذاكر والإعلانات هنا فور تأكيدها.',
      cols: { ref: 'مرجع', vessel: 'السفينة / الفنان', etd: 'التاريخ', bay: 'الرصيف / المسرح', status: 'الحالة', action: '' },
      statusBoarding: 'الصعود',
      statusPending: 'بيان قيد الإعداد',
    },
    event: {
      docId: 'تفاصيل السفينة / مدخل البيان',
      back: 'العودة إلى البيان',
      artistLabel: 'السفينة / الفنان',
      dateLabel: 'التاريخ',
      timeLabel: 'الأبواب / الوقت',
      venueLabel: 'الرصيف / المكان',
      locationLabel: 'الموقع',
      genreLabel: 'الحمولة / النوع',
      bioLabel: 'ملاحظات البيان',
      venueName: 'ذا كونتينر',
      venueLine: 'محطة شمس للحاويات، حي المُليساء، منطقة ميناء جدة، ساحل البحر الأحمر، المملكة العربية السعودية.',
      timeTba: 'سيُعلن عن الوقت لاحقًا',
      subjectToChange: 'العروض قابلة للتغيير.',
      ticketsCta: 'اشترِ التذاكر',
      ticketsSoon: 'التذاكر — قريبًا',
      mapCta: 'افتح في الخرائط',
      notFound: 'مدخل البيان غير موجود.',
    },
    visit: {
      eyebrow: 'خطّط لليلتك',
      title: 'الزيارة',
      addressTitle: 'الموقع',
      address:
        'محطة شمس للحاويات، حي المُليساء، منطقة ميناء جدة، ساحل البحر الأحمر، المملكة العربية السعودية.',
      gettingThereTitle: 'كيفية الوصول',
      gettingThere:
        'يقع المكان داخل منطقة الميناء الصناعية على الواجهة البحرية. نوصي بالوصول بالسيارة أو خدمات النقل التشاركي؛ تُشارَك إرشادات الوصول وبوابة الدخول مع كل إعلان فعالية على إنستغرام.',
      hoursTitle: 'المواعيد',
      hours:
        'تُنشَر مواعيد الأبواب والعروض لكل فعالية. عادةً ما تمتد العروض من بعد الظهر حتى الليل.',
      mapCta: 'افتح في الخرائط',
      entryTitle: 'الدخول',
      entry:
        'يستضيف ذا كونتينر فعاليات موسيقى إلكترونية حيّة مرخّصة. الدخول لحاملي التذاكر؛ يُرجى إحضار هوية سارية. تُؤكَّد تفاصيل الدخول الخاصة بكل فعالية عند الإعلان عنها.',
    },
    footer: {
      tagline: 'وجهة جدة لموسيقى التكنو والهاوس الصناعية على ميناء البحر الأحمر.',
      follow: 'تابعنا',
      contact: 'تواصل',
      rights: 'جميع الحقوق محفوظة.',
      eventsNote: 'فعاليات موسيقى إلكترونية حيّة · جدة، المملكة العربية السعودية',
      endOfManifest: 'نهاية البيان',
      igSoon: 'إنستغرام — قريبًا',
      contactSoon: 'تفاصيل التواصل — قريبًا',
    },
    months: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
    ],
    weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  },
};

export function formatEventDate(iso: string, lang: Lang): string {
  const d = new Date(iso + 'T00:00:00');
  const t = dict[lang];
  const wd = t.weekdays[d.getDay()];
  const day = d.getDate();
  const month = t.months[d.getMonth()];
  const year = d.getFullYear();
  return `${wd} · ${day} ${month} ${year}`;
}

// Container ID code, e.g. "CNTR 21 08 26" from a date — manifest flavor.
export function containerCode(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  const pad = (n: number) => String(n).padStart(2, '0');
  return `CNTR ${pad(d.getDate())} ${pad(d.getMonth() + 1)} ${String(d.getFullYear()).slice(2)}`;
}
