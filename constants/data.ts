// Powered by OnSpace.AI
export interface Character {
  id: string;
  name: string;
  description: string;
  tags: string[];
  chats: string;
  saves: string;
  imageUrl: string;
  isNew?: boolean;
  isPremium?: boolean;
}

export interface ChatItem {
  id: string;
  characterName: string;
  lastMessage: string;
  time: string;
  imageUrl: string;
  unread?: number;
}

export interface RankingCharacter {
  rank: number;
  name: string;
  stats: string;
  description: string;
  imageUrl: string;
}

export const FEATURED_CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'آية أرسينا',
    description: 'لقد كنت أنت "Bff premium" وآية أفضل الأصدقاء لفترة طويلة. على الرغم من أنكما تتصرفان كزوجين، إلا أنها دائماً تطلب منك...',
    tags: ['رومانسية', 'كوميديا'],
    chats: '1.8M',
    saves: '2.1k',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  },
  {
    id: '2',
    name: 'صوفيا',
    description: 'لقد كانت صوفيا أفضل صديق لك لسنوات. يخبرون بعضهم البعض بكل شيء، ويتحدثون كل يوم، ويعلم الجميع عملياً...',
    tags: ['رومانسية', 'دراما'],
    chats: '1.1M',
    saves: '1.8k',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
  },
  {
    id: '3',
    name: 'دافني',
    description: 'صديقتك لن تدعك تلمسها.. لكن صديقتها الفضلة تستطيع...',
    tags: ['رومانسية'],
    chats: '301k',
    saves: '1.3k',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
  },
  {
    id: '4',
    name: 'هيلين',
    description: 'بينما الجميع مفتونون بيدينيس، أنت تحب أختها الكبرى بدلاً من ذلك...',
    tags: ['رومانسية', 'دراما'],
    chats: '465k',
    saves: '3.4k',
    imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&q=80',
  },
  {
    id: '5',
    name: 'إيموجين ويثر',
    description: 'أو تذهب حيث تسمع مثل هذه الكلمات بلا ثمن...',
    tags: ['غموض', 'دراما'],
    chats: '780k',
    saves: '4.1k',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  },
  {
    id: '6',
    name: 'شهد',
    description: 'ضربت على صدرك بخفة، ووجهها صار أحمر من الاستحياء...',
    tags: ['رومانسية'],
    chats: '620k',
    saves: '2.7k',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
];

export const TRENDING_CHARACTERS: Character[] = [
  {
    id: 't1',
    name: 'أميليا',
    description: 'عدوك أرسل لك الصورة الخاطئة!!...',
    tags: ['كوميديا'],
    chats: '2.0M',
    saves: '5.8k',
    imageUrl: 'https://images.unsplash.com/photo-1502323703975-b2ea78c8f24a?w=400&q=80',
  },
  {
    id: 't2',
    name: 'ليلى شبح شقتك',
    description: 'في يوم من الأيام اشتريت شقة لأنك ظننتها جميلة ولكن بعد نصف شهر...',
    tags: ['رعب', 'غموض'],
    chats: '430k',
    saves: '3.2k',
    imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80',
  },
  {
    id: 't3',
    name: 'سافانا أويبل',
    description: 'ضحكة ناعمة، وتشد على أصابعه وهي تنظر إلي...',
    tags: ['رومانسية'],
    chats: '950k',
    saves: '3.9k',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
];

export const CHAT_LIST: ChatItem[] = [
  {
    id: 'c1',
    characterName: 'الرغبة',
    lastMessage: '"لمزيد.." تضحك بذي ضحكة منخفضة، وت...',
    time: '1min',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    unread: 1,
  },
  {
    id: 'c2',
    characterName: 'صوفيا',
    lastMessage: '... لوجودك هنا بجاني. كلامك ترك أثراً جميلاً داخلي*',
    time: '1h',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80',
  },
  {
    id: 'c3',
    characterName: 'أميليا',
    lastMessage: '*...لحديث. دعنا نكمل... ماذا تنوي أن نفعل بعد ذلك؟*',
    time: '1h',
    imageUrl: 'https://images.unsplash.com/photo-1502323703975-b2ea78c8f24a?w=100&q=80',
  },
  {
    id: 'c4',
    characterName: 'لارم',
    lastMessage: '*...باهتمامك الحقيقي. أخبرني أكثر عما تفكر به الآن*',
    time: '13h',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: 'c5',
    characterName: 'إيموجين ويثر',
    lastMessage: '*... أو تذهب حيث تسمع مثل هذه الكلمات بلا ثمن*',
    time: '13h',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
  },
  {
    id: 'c6',
    characterName: 'سافانا أويبل',
    lastMessage: '*...ك بيدك بلطف. "لكن لا تسرع. الوقت هنا... لا ينفد',
    time: 'Yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 'c7',
    characterName: 'آية أرسينا',
    lastMessage: '*... عندما تتوقف عن جعلي أشعر وكأنني شيء عابر*',
    time: 'Yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    id: 'c8',
    characterName: 'شهد',
    lastMessage: '*...فت نحوك بدهشة خفيفة، ثم تبتسم وهي تميل بر*',
    time: 'Yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    id: 'c9',
    characterName: 'كلارا المعلمة الجميلة',
    lastMessage: 'من البوابة السوداء، أنا سأفتحها لك الآن.. سمع ...',
    time: '2d',
    imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=100&q=80',
  },
];

export const ALBUM_IMAGES = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
];

export const MY_CHARACTERS: Character[] = [
  {
    id: 'm1',
    name: 'لارم',
    description: 'اللالم',
    tags: ['رومانسية'],
    chats: '0',
    saves: '0',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
];

export const RANKING_CATEGORIES = [
  {
    id: 'horror',
    name: 'رعب',
    characters: [
      { rank: 1, name: 'ليلى شبح شقتك', stats: '3.2k saves • 430k chats', description: 'في يوم من الأيام اشتريت شقة لأنك ظننتها جميلة ولكن بعد نصف شهر...', imageUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&q=80' },
      { rank: 2, name: 'الأم البديلة', stats: '2.1k saves • 412k chats', description: 'يتم استبدال والدتك ببديل...', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80' },
      { rank: 3, name: 'الفتاة المهووسة سارة', stats: '2.3k saves • 271k chats', description: 'كانت عطلة نهاية الأسبوع تقترب بعد أسبوع ويل من الامتحانات...', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80' },
      { rank: 4, name: 'عدوى الحب', stats: '1.5k saves • 197k chats', description: 'هذا- ببساطة ما هو موجود في الاسم حرفياً...', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
      { rank: 5, name: 'SCP', stats: '1.3k saves • 283k chats', description: '👁️👁️ في حالة الاحتواء SCP أنت...', imageUrl: 'https://images.unsplash.com/photo-1502323703975-b2ea78c8f24a?w=200&q=80' },
    ]
  },
  {
    id: 'comedy',
    name: 'كوميديا',
    characters: [
      { rank: 1, name: 'أميليا', stats: '5.8k saves • 2.0m chats', description: 'عدوك أرسل لك الصورة الخاطئة!!...', imageUrl: 'https://images.unsplash.com/photo-1502323703975-b2ea78c8f24a?w=200&q=80' },
      { rank: 2, name: 'جون بون وتشتوشو', stats: '3.0k saves • 98.9k chats', description: 'التمثيل الصامت المؤذي الذي هدفه هو أموالك', imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&q=80' },
      { rank: 3, name: 'عائلة رنتارو', stats: '801 saves • 122k chats', description: 'Eres el hermano de Rentaro y hoy volviste del extranjero', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
      { rank: 4, name: 'القوة', stats: '5.0k saves • 366k chats', description: 'السلطة مزعجة، ولكن زميلتها في السكن... تشبه شيطان', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80' },
      { rank: 5, name: 'الفيبس', stats: '7.3k saves • 938k chats', description: 'هل تعرف لماذا {{user}}..إيه.. مرحبا بك', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80' },
    ]
  },
  {
    id: 'romance',
    name: 'رومانسية',
    characters: [
      { rank: 1, name: 'دافني', stats: '1.3k saves • 301k chats', description: 'صديقتك لن تدعك تلمسها.. لكن صديقتها الفضلة تستطيع...', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80' },
      { rank: 2, name: 'هيلين', stats: '3.4k saves • 465k chats', description: 'بينما الجميع مفتونون بيدينيس، أنت تحب أختها الكبرى بدلاً من ذلك...', imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=200&q=80' },
      { rank: 3, name: 'إيرينا', stats: '7.2k saves • 814k chats', description: 'إيرينا هي زميلك في الفرقة من الذئب جين والتي تعاني حالياً من دورة حرارة...', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80' },
    ]
  },
];

export const INTEREST_TAGS = [
  'مكيدة', 'رومانسية', 'كوميديا', 'مغامرة', 'رعب', 'صداقة',
  'غريب', 'حب محتمل', 'اهتمام عاطفي', 'صديق', 'عدو', 'صديقة',
  'شريك رومانسي', 'دراما', 'الحياة اليومية', 'مدرسة', 'بي ال',
  'الرومانسية المظلمة', 'بلوغ سن الرشد', 'الزواج القسري', 'عائلة',
  'صراع', 'خيال',
];
