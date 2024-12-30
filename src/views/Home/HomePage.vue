<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'
import ComShortcut from '@/components/ComShortcut.vue'
import ComHeader from '@/components/ComHeader.vue'
import { Grid } from '@element-plus/icons-vue'
import RankList from '@/components/RankList.vue'
import TypeList from '@/components/TypeList.vue'
import ComAffix from '@/components/ComAffix.vue'
import router from '@/router/index.js'
import { useCategoryStore } from '@/stores'

const categoryData = [
  {
    id: 1,
    name: "古代言情",
    subcategory: [
      { id: 1, name: "古代情缘" },
      { id: 2, name: "宫闱宅斗" },
      { id: 3, name: "经商种田" },
      { id: 4, name: "古典架空" },
      { id: 5, name: "女尊王朝" },
      { id: 6, name: "穿越奇情" }
    ]
  },
  {
    id: 2,
    name: "仙侠奇缘",
    subcategory: [
      { id: 7, name: "武侠情缘" },
      { id: 8, name: "古典仙侠" },
      { id: 9, name: "现代修真" },
      { id: 10, name: "远古洪荒" }
    ]
  },
  {
    id: 3,
    name: "现代言情",
    subcategory: [
      { id: 11, name: "商战职场" },
      { id: 12, name: "豪门世家" },
      { id: 13, name: "都市生活" },
      { id: 14, name: "娱乐明星" },
      { id: 15, name: "都市异能" },
      { id: 16, name: "极道江湖" },
      { id: 17, name: "民国情缘" }
    ]
  },
  {
    id: 4,
    name: "浪漫青春",
    subcategory: [
      { id: 18, name: "青春校园" },
      { id: 19, name: "青春疼痛" },
      { id: 20, name: "叛逆成长" },
      { id: 21, name: "青春纯爱" }
    ]
  },
  {
    id: 5,
    name: "玄幻言情",
    subcategory: [
      { id: 22, name: "东方玄幻" },
      { id: 23, name: "异世大陆" },
      { id: 24, name: "西方奇幻" },
      { id: 25, name: "远古神话" },
      { id: 26, name: "异族恋情" },
      { id: 27, name: "魔法幻情" }
    ]
  },
  {
    id: 6,
    name: "悬疑推理",
    subcategory: [
      { id: 28, name: "推理侦探" },
      { id: 29, name: "诡秘惊险" },
      { id: 30, name: "悬疑探险" },
      { id: 31, name: "奇妙世界" },
      { id: 32, name: "神秘文化" }
    ]
  },
  {
    id: 7,
    name: "科幻空间",
    subcategory: [
      { id: 33, name: "星际恋歌" },
      { id: 34, name: "时空穿梭" },
      { id: 35, name: "未来世界" },
      { id: 36, name: "古武机甲" },
      { id: 37, name: "超级科技" },
      { id: 38, name: "进化变异" },
      { id: 39, name: "末世危机" }
    ]
  },
  {
    id: 8,
    name: "游戏竞技",
    subcategory: [
      { id: 40, name: "电子竞技" },
      { id: 41, name: "网游情缘" },
      { id: 42, name: "游戏异界" },
      { id: 43, name: "体育竞技" }
    ]
  },
  {
    id: 9,
    name: "衍生同人",
    subcategory: [
      { id: 44, name: "同人衍生" },
      { id: 45, name: "唯美幻想" },
      { id: 46, name: "萌系变身" },
      { id: 47, name: "青春日常" },
      { id: 48, name: "搞笑吐槽" },
      { id: 49, name: "古典衍生" },
      { id: 50, name: "影视衍生" },
      { id: 51, name: "动漫衍生" },
      { id: 52, name: "其他衍生" }
    ]
  },
  {
    id: 10,
    name: "现实生活",
    subcategory: [
      { id: 53, name: "家与情感" },
      { id: 54, name: "行业人生" },
      { id: 55, name: "人文博览" },
      { id: 56, name: "探索科幻" }
    ]
  }
];
const categoryStore = useCategoryStore()
categoryStore.setCategories(categoryData)
//轮播图
const carouselRef = ref(null)
const carouselItems = ref([
  {
    id: 1,
    img: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/bce1facfcb4a3f963811b32398fab1ac.jpg',
    name: '我在异世封神',
  },
  {
    id: 2,
    img: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/a729dd321dbcddea5c3602dfc758b931.jpg',
    name: '我坐拥万亿冥币封神',
  },
  {
    id: 3,
    img: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/d6991076a8552816f89ae53605f10b16.jpg',
    name: '低等雌性爆红全星际',
  },
  {
    id: 4,
    img: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/d98cc026cfc3ba308e94f05933efa181.jpg',
    name: '不如当自身簪缨',
  },
])
const activeIndex = ref(0)
const handleSlideChange = (index) => {
  activeIndex.value = index
}
const goToSlide = (index) => {
  activeIndex.value = index // 设置高亮
  carouselRef.value.setActiveItem(index) // 通过 ref 引用跳转到对应的轮播图
}

//主编推荐书
const editorChoiceBooks = ref([
  {
    id: 1,
    name: '上辈子苦够了，打死她都不嫁了',
    author: '常庆庆',
    profile:
      '沈安安家世显赫，有才又有貌，方一及笄就被许配给了天人之姿，握瑜怀玉的四皇子，萧渊。全京城闺秀的梦中情郎。 老天给了她一手好牌，连她自己都曾认为她得天独厚，直到满腔少女心被伤的寸寸碎裂，她在那个芝兰玉树的男人身上尝尽了苦，代价惨烈。 重来一次，沈安安有多远躲多远。 本姑娘才貌双全，嫁个两情两悦的夫君不香？ 她在家族预备的世家子弟中挑挑拣拣，誓要嫁个温润如玉的谦谦君子，可那弃她如敝履的四皇子却冷了脸，盯着她的',
    tags: ['宫斗宅斗', '重生', '前世今生'],
    cover:
      'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/p2ob0c7c0e77654c241a0b5be6dc7f9b934%7Etplv-resize_200_260.png',
  },
  {
    id: 2,
    name: '听说我死后成了反派白月光',
    author: '甜甜的瓜',
    profile:
      '桑念不小心爬到了修仙界，成了书里下场凄惨的恶毒女配。 　系统：你的任务是嫁给男配谢沉舟，虐待他，羞辱他，然后被他嘎掉。 　桑念：ok(挥舞小皮鞭)（打中自己）（噗通倒地） 　系统：（沉默）（望天） 　系统：任务更改，你给我攻略他，失败就去挖煤 　桑念：（自信一笑）这简直易如反掌 　然后她就成功被谢沉舟嘎掉了。 　她以为自己会被送去隔壁世界挖煤，可再睁开眼，她重生到了三百年后。',
    tags: ['系统', '穿越', '甜宠'],
    cover: '',
  },
  {
    id: 3,
    name: '醉吻夜！她一撩，桀骜大佬心狂跳',
    author: '一剪月',
    profile:
      '【京圈顶级豪门·桀骜深情西装暴徒vs芭蕾舞圈公主·明艳骄矜小天鹅】 【双洁甜撩+先婚后爱+蓄谋已久+豪门恋综】 黎枝和傅砚泽青梅竹马，可惜黎枝成了假千金。 为了利益，傅砚泽选择与娱乐圈花旦真千金订婚，希望黎枝理解，等他得利后再回来娶她。 后来黎枝果然来到他陪真千金营业的恋综。 美人明眸流盼，细腰雪肤，戴钻石皇冠，穿顶奢舞裙，潋滟动人地跳着芭蕾而至。 全网谩骂黎枝是小三，死皮赖脸插足别人感情！ 只有傅砚泽内心暗爽...',
    tags: ['总裁', '婚恋', '娱乐圈'],
    cover: '',
  },
  {
    id: 4,
    name: '满门反派疯批，唯有师妹逗比',
    author: '未小兮',
    profile:
      '一朝穿书，叶灵泷成了修仙文里的恶毒炮灰女配，资质奇差还在修仙大会上胁迫女主带她进第一宗门，入门后处处跟女主作对最后惨死收场。 　　为了快乐苟活，叶灵泷当场放弃胁迫女主，扭头就进了修真界最差的门派，这恶毒女配她不当了！鬼才衬托女主，她要独自美丽。 　　本以为进个最差宗门能吃喝玩乐苟日子当咸鱼，谁知这最差的宗门里全员都是疯批反派，随时走在黑化边缘，准备给女主挨个送头。 　　啊这…她们门派要是马上要团灭了吗？',
    tags: ['穿越', '反派'],
    cover: '',
  },
  {
    id: 5,
    name: '宠妾灭妻，重生我退婚渣男嫁王爷',
    author: '之知',
    profile:
      '曾用名《乘鸾》【已签出版】【重生+大女主双强+家国天下+权谋】 　　十七岁前，沈妤是横刀立马的将门嫡女。 　　十七岁后，她成了江府病骨支离的侍郎妻。 　　父兄战死，沈家满门忠烈，她背着骂名嫁给了江敛之。 　　原以为他是她的救命草，没想到却是她的夺命刀。 　　曾经征战沙场的将门虎女，却被一场阴谋溺死在冰湖中。 　　重回父兄战死那一年，她踽踽独行，一路走来都是这世道的满目疮痍。 　　无人报的仇，她来报，无人给的公...',
    tags: ['宫斗宅斗', '重生', '女强'],
    cover: '',
  },
])
const defaultCover = ref(
  'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/QQ20241214-170042.png',
)

const announcementsImg = ref(
  'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/2a9c682e69318ddee6c192bf4db436f0.jpg',
)

const announcementsItems = ref([
  {
    id: 1,
    content: '月下蝶影新书发布',
  },
  {
    id: 2,
    content: '中短篇悬疑征文获奖作品已揭晓！',
  },
  {
    id: 3,
    content: '历史的风尘新书: 归期',
  },
  {
    id: 4,
    content: '2024年度小说评选~',
  },
  {
    id: 5,
    content: '鬼怪来袭——惊悚悬疑小说推荐',
  },
  {
    id: 6,
    content: '第四届网络小说征文大赛',
  },
])

const recommendNewBooks = ref([
  {
    id: 1,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 2,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 3,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 4,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 5,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 6,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 7,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 8,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 9,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 9,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
])

const numberBooks = {
  id: 1,
  name: '穿成小说男主白月光',
  type: '现代言情',
  author: '微兮凉',
  number: 120201,
}
const noNumberBooks = {
  id: 1,
  name: '穿成小说男主白月光',
  type: '现代言情',
  author: '微兮凉',
}
const passRank = ref([
  {
    id: 1,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 120201,
  },
  {
    id: 2,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 100123,
  },
  {
    id: 3,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 89001,
  },
  {
    id: 4,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 87990,
  },
  {
    id: 5,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 76891,
  },
  {
    id: 6,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 70221,
  },
  {
    id: 7,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 69314,
  },
  {
    id: 8,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 66789,
  },
  {
    id: 9,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 50112,
  },
  {
    id: 10,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
    number: 49901,
  },
])

const sellingRank = ref([
  {
    id: 1,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 2,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 3,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 4,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 5,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 6,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 7,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 8,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 9,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
  {
    id: 9,
    name: '穿成小说男主白月光',
    type: '现代言情',
    author: '微兮凉',
  },
])

const typeBooks = [
  {
    id: 1,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护!',
  },
  {
    id: 2,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 3,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 4,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 5,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 1,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护!',
  },
  {
    id: 2,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 3,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 4,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
  {
    id: 5,
    name: '被反派哥哥读心之后',
    author: '月下蝶影',
    shortProfile: '这一次，哥哥们由我来守护',
  },
]
const categories = ref(categoryStore.getCategories())
const typeLists = ref([
  {
    id: 1,
    type: '古代言情',
    books: typeBooks,
  },
  {
    id: 2,
    type: '仙侠奇缘',
    books: typeBooks,
  },
  {
    id: 3,
    type: '现代言情',
    books: typeBooks,
  },
  {
    id: 4,
    type: '浪漫青春',
    books: typeBooks,
  },
  {
    id: 5,
    type: '玄幻言情',
    books: typeBooks,
  },
  {
    id: 6,
    type: '悬疑推理',
    books: typeBooks,
  },
  {
    id: 7,
    type: '科幻空间',
    books: typeBooks,
  },
  {
    id: 8,
    type: '游戏竞技',
    books: typeBooks,
  },
  {
    id: 9,
    type: '衍生同人',
    books: typeBooks,
  },
  {
    id: 10,
    type: '现实生活',
    books: typeBooks,
  },
])

const collectionRank = ref([
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
  numberBooks,
])

const newBooks = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: '新书' + i,
    author: '作者' + i,
    cover: 'https://via.placeholder.com/120',
    favorites: 100,
    description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介' + i,
  })),
)

const newActiveIndex = ref(0)
const currentBook = ref(newBooks.value[newActiveIndex.value])
const handleCarouselChange = (index) => {
  // 更新当前的索引
  newActiveIndex.value = index
  currentBook.value = newBooks.value[newActiveIndex.value]
}
const toBookDetail = (bookId) => {
  const newRoute = router.resolve({ name: 'BookDetail', params: { id: bookId }})
  window.open(newRoute.href, '_blank')
}

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
//固定
const showAffix = ref(false)

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  // 滑动到 200px 显示 Affix
  showAffix.value = scrollTop > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>

<template>
  <div>
    <ComShortcut></ComShortcut>
    <ComHeader></ComHeader>
    <el-affix v-if="showAffix" :offset="0" class="affix-container">
      <ComAffix></ComAffix>
    </el-affix>
    <nav class="nav">
      <div class="w">
        <div class="dropdown">
          <div class="dt">
            <div class="icon">
              <el-icon size="30px">
                <Grid />
              </el-icon>
            </div>
            <span>分类</span>
          </div>
          <div class="dd">
            <span v-for="(category, index) in categories" :key="index">
              <router-link :to="{ name: 'Category', params: { id: category.id } }" target="_blank">
                {{ category.name }}
              </router-link>
            </span>
          </div>
        </div>
        <div class="navitems">
          <ul>
            <li>
              <router-link :to="{ name: 'All' }" target="_blank">全部作品</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Rank' }" target="_blank">排行</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'All', query: { status: 2 } }" target="_blank"
                >完本</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'All', query: { attribute: 1 } }" target="_blank"
                >免费</router-link
              >
            </li>
            <li><a>作家专区</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="w">
      <div class="carousel">
        <el-carousel height="270px" ref="carouselRef" @change="handleSlideChange" :interval="2400">
          <el-carousel-item v-for="item in carouselItems" :key="item" :name="item.name">
            <router-link :to="{ name: 'BookDetail', params: { id: item.id } }" target="_blank">
              <el-image :src="item.img" alt="carousel image" class="carousel-image"   style="cursor: pointer;"/>
            </router-link>
          </el-carousel-item>
        </el-carousel>
        <ul class="carousel-name">
          <li
            v-for="(item, index) in carouselItems"
            :key="item"
            :class="{ active: newActiveIndex === index }"
            @click="goToSlide(index)"
            style="cursor: default;"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="testimonialsAndAnnouncements w">
      <div class="editorChoice">
        <span class="title">
          主编力荐
          <svg class="icon editorChoiceIcon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
        </span>
        <div class="tabs">
          <el-tabs tab-position="left" style="height: 420px" class="demo-tabs">
            <el-tab-pane v-for="item in editorChoiceBooks" :key="item.id" :label="item.name">
              <router-link :to="{ name: 'BookDetail', params: { id: item.id } }" target="_blank">
              <el-image
                :src="item.cover === '' ? defaultCover : item.cover"
                style="height: 160px; width: 120px; margin-left: 45px; border: 1px solid #d6d1d1"
              ></el-image>
              </router-link>
              <el-card style="font-size: 13px; height: 245px" shadow="never">
                <div class="profile">
                  {{ item.profile }}
                </div>
                <div class="tags">
                  <el-tag
                    v-for="tag in item.tags.slice(0, 3)"
                    :key="tag"
                    type="primary"
                    effect="light"
                    round
                    class="tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="announcements">
        <span class="title">
          资讯公告
          <svg class="icon announcementsIcon" aria-hidden="true">
            <use xlink:href="#icon-gonggao"></use>
          </svg>
        </span>
        <div class="img">
          <el-image :src="announcementsImg"></el-image>
        </div>
        <ul>
          <li v-for="item in announcementsItems.slice(0, 8)" :key="item.id">
            <router-link :to="{ name: 'BookDetail', params: { id: item.id } }"  target="_blank"
              >{{ item.content }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="newBookRecommend">
        <span class="title"> 新书强推 </span>
        <ul>
          <li v-for="item in recommendNewBooks.slice(0, 11)" :key="item.id">
            <span>[{{ item.type }}]</span>
            <router-link :to="{ name: 'BookDetail', params: { id: item.id } }"  target="_blank"
              >{{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="rank w">
      <!--      月票榜(这个月得到的月票排行)-->
      <div class="pass">
        <RankList title="月票榜"  name="pass" type="0" :books="passRank" :img="defaultCover"></RankList>
      </div>
      <!--      畅销榜(这个月得到的订阅点数排行)-->
      <div class="selling">
        <RankList title="畅销榜" name="selling" type="1" :books="sellingRank" :img="defaultCover"></RankList>
      </div>
      <!--      月推荐榜(这个月得到的推荐票总数)-->
      <div class="recommend">
        <RankList title="月推荐榜" name="recommend" type="2" :books="passRank" :img="defaultCover"></RankList>
      </div>

      <div class="collection">
        <RankList title="收藏榜" type="3" :books="collectionRank" :img="defaultCover"></RankList>
      </div>
    </div>

    <!-- 新书 -->
    <div class="new-channel w channel">
      <div class="new-book">
        <span class="title">新书推荐</span>
        <div class="new-channel-book">
          <div class="carousel">
            <el-carousel
              :interval="2000"
              type="card"
              height="140px"
              @change="handleCarouselChange"
              ref="carousel"
              indicator-position="none"
            >
              <el-carousel-item v-for="(book, index) in newBooks" :key="index">
                <el-image :src="book.cover" alt="封面" class="img" />
              </el-carousel-item>
            </el-carousel>
            <div class="book-info">
              <p class="title">{{ currentBook.title }}</p>
              <p class="author">{{ currentBook.author }}</p>
              <p class="likes">
                <span>{{ currentBook.favorites }}</span> 收藏
              </p>
              <p class="description">{{ currentBook.description }}</p>
              <el-button plain round color="#19bad8" @click="toBookDetail(currentBook.id)">
                书籍详情
              </el-button>
            </div>
          </div>
          <div class="grid">
            <div class="book-card" v-for="book in newBooks.slice(0, 6)" :key="book.title">
              <el-image :src="book.cover" alt="封面" class="img" />
              <p class="new-book-title" style="cursor: pointer" @click="toBookDetail(book.id)">{{ book.title }}</p>
              <p class="description">{{ book.description }}</p>
              <el-avatar :size="16" :src="circleUrl" class="avatar" />
              <p class="author">{{ book.author }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="rank">
        <RankList title="新书榜" name="newBook" type="1" :books="sellingRank" :img="defaultCover"></RankList>
      </div>
    </div>

    <div class="list w">
      <div class="type" v-for="(typeList, index) in typeLists.slice(0,9)" :key="index">
        <TypeList :id="typeList.id" :books="typeList.books" :title="typeList.type"></TypeList>
      </div>
    </div>
    <el-backtop :right="50" :bottom="100">
      <svg class="icon" aria-hidden="true" style="width: 30px; height: 30px">
        <use xlink:href="#icon-backtop"></use>
      </svg>
    </el-backtop>
  </div>
</template>

<style scoped lang="scss">
.w {
  width: 949px;
  margin: 0 auto;
}

.nav {
  margin-top: 110px;
  height: 47px;
  border-bottom: 2px solid #19bad8;

  .dropdown {
    float: left;
    width: 212px;
    height: 47px;

    .dt {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 45px;
      font-size: 20px;
      background-color: #23c4e3;
      opacity: 0.8;
      color: #f7f7f7;

      .icon {
        float: left;
        margin-top: 8px;
        padding-left: 10px;
      }

      span {
        float: left;
        padding-left: 10px;
      }
    }

    .dd {
      width: 210px;
      height: 266px;
      border: 1px solid #19bad8;
      background-color: #23c4e3;
      opacity: 0.8;
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* 两列 */

      span {
        margin-top: 10px;
        width: 80px;
        height: 40px;
        margin-left: 10px;
      }

      a {
        text-decoration: none;
        text-align: center;
        line-height: 40px;
        margin-left: 10px;
        color: white;
      }

      a:hover {
        color: crimson;
      }
    }
  }

  .navitems {
    float: left;

    ul li {
      float: left;
      list-style: none;
      margin: 0 20px;

      a {
        text-decoration: none;
        color: black;
      }
    }

    a:hover {
      color: crimson;
      font-weight: 500;
    }
  }
}

.carousel {
  margin-left: 223px;
  margin-top: 12px;
  position: relative;

  ul {
    position: absolute;
    top: 209px;
    left: -39px;

    li {
      float: left;
      list-style: none;
      box-sizing: border-box;
      padding: 4px 15px;
      width: 181px;
      background-color: rgba(128, 128, 128, 0.7);
      color: white;
      font-weight: 300;
      font-family: '仿宋', serif;
    }

    li.active {
      background-color: #19bad8;
      font-weight: bold;
    }
  }
}

.testimonialsAndAnnouncements {
  margin-top: 10px;
  height: 500px;

  .title {
    padding-left: 60px;
    padding-right: 55px;
    padding-bottom: 12px;
    width: 100%;
    border-bottom: 1px solid #9f9f9f;
    font-size: 25px;
    font-family: '华文楷体', serif;
  }

  .editorChoice {
    width: 500px;
    float: left;
    margin-top: 20px;

    .editorChoiceIcon {
      height: 1em;
      width: 1em;
    }

    .tabs {
      margin-top: 20px;

      .profile {
        display: -webkit-box; /* 创建弹性盒子布局 */
        -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
        -webkit-line-clamp: 11;
      }

      .tags {
        margin-top: 10px;
      }

      span {
        font-size: 13px;
        margin: 0 2px;
      }
    }
  }

  .announcements {
    width: 200px;
    height: 100%;
    margin-left: 20px;
    margin-top: 20px;
    float: left;

    .title {
      padding-left: 37px;
      padding-right: 30px;

      .announcementsIcon {
        width: 1em;
        height: 1em;
      }
    }

    .img {
      margin-top: 30px;
    }

    ul {
      border-top: 1px solid #c8c7c7;
      padding-top: 10px;
    }

    li {
      list-style: none;
      width: 180px;
      height: 35px;
      margin-left: -24px;
      line-height: 35px;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
    }

    a {
      font-weight: 400;
      font-size: 15px;
      font-family: '仿宋', serif;
      text-decoration: none;
      color: black;
    }

    a:hover {
      color: #ed0b38;
    }
  }

  .newBookRecommend {
    width: 200px;
    height: 100%;
    margin-left: 20px;
    margin-top: 20px;
    float: left;

    .title {
      padding-left: 50px;
      padding-right: 45px;
    }

    li {
      list-style: none;
      width: 196px;
      height: 35px;
      margin-left: -40px;
      line-height: 35px;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
      border-bottom: 1px solid #c8c7c7;

      span {
        font-weight: 400;
        font-size: 15px;
        font-family: '仿宋', serif;
        color: #717171;
      }

      a {
        font-weight: 400;
        font-size: 15px;
        font-family: '仿宋', serif;
        text-decoration: none;
        color: black;
      }

      a:hover {
        color: #ed0b38;
      }
    }
  }
}

.rank {
  height: 500px;
  margin-top: 10px;

  .pass {
    float: left;
  }

  .selling {
    float: left;
    margin-left: 18px;
  }

  .recommend {
    float: left;
    margin-left: 18px;
  }

  .collection{
    float: left;
    margin-left: 18px;
  }
}

.channel{
  height: 500px;
  margin-top: 40px;
  .new-book {
    float: left;
    width: 700px;

    .title {
      font-size: 22px;
      font-family: '华文中宋', serif;
      margin-left: 10px;
    }

    .new-channel-book {
      border-top: 1px solid #686868;
      margin-top: 5px;
      padding-top: 10px;

      .carousel {
        float: left;
        width: 200px;
        height: 380px;
        padding: 20px 20px;
        background-color: #e3f9fd;
        margin-left: 1px;

        .img {
          height: 135px;
          width: 100px;
        }

        .book-info {
          display: flex;
          flex-direction: column; /* 垂直排列 */
          justify-content: center; /* 垂直方向居中 */
          align-items: center; /* 水平方向居中 */
          text-align: center; /* 使文本内容居中 */
          height: 100%; /* 使容器填满父容器的高度 */
        }

        .book-info .title,
        .book-info .author,
        .book-info .likes,
        .book-info .description {
          margin: 10px 0; /* 为每个元素添加一些间距 */
        }

        .book-info {
          margin-top: 10px;
          width: 200px;
          align-content: center;

          .title {
            margin-top: -170px;
            font-size: 22px;
            font-family: '黑体', serif;
            font-weight: bold;

          }

          .author {
            font-size: 15px;
            margin-top: -5px;
            font-family: '华文仿宋', serif;
            color: #ed0b38;
          }

          .likes {
            margin-top: -5px;

            span {
              font-size: 20px;
              color: #ed0b38;
            }
          }

          .description {
            color: #6c6b6b;
            font-size: 14px;
            margin-bottom: 20px;
            display: -webkit-box; /* 创建弹性盒子布局 */
            -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            -webkit-line-clamp: 3;
          }
        }

        .el-carousel__item h3 {
          display: none;
          color: #475669;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
          text-align: center;
        }
      }

      .grid {
        float: left;
        width: 440px;
        padding-left: 18px;

        .book-card {
          position: relative;
          width: 220px;
          height: 140px;
          border-bottom: 1px solid #bdbdbd;
          float: left;

          .img {
            position: absolute;
            left: 10px;
            top: 25px;
            height: 90px;
            width: 70px;
          }

          .new-book-title {
            position: absolute;
            left: 98px;
            top: 5px;
            font-size: 16px;
            font-weight: bold;
            max-width: 100px;
            overflow: hidden; /* 隐藏超出部分 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
          }

          .description {
            position: absolute;
            left: 98px;
            top: 33px;
            font-family: '华文中宋', serif;
            font-size: 12px;
            color: #575656;
            max-width: 100px;
            display: -webkit-box; /* 创建弹性盒子布局 */
            -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            -webkit-line-clamp: 3;
          }

          .avatar {
            position: absolute;
            left: 98px;
            top: 100px;
          }

          .author {
            position: absolute;
            font-family: '华文中宋', serif;
            font-size: 13px;
            color: #818181;
            left: 120px;
            top: 86px;
          }
        }
      }
    }
  }

  .rank {
    float: left;
    margin-top: 2px;
    margin-left: 10px;
  }
}

.list {
  height: 500px;
  margin-top: 25px;

  .type {
    float: left;
    padding-left: 10px;
    margin-bottom: 15px;
  }
}

.end {
  float: left;
  margin-left: 20px;
  margin-top: -6px;
}

</style>
