<script setup>
import { ref } from 'vue'
import { reactive, computed } from 'vue'
import CatalogDialog from '@/views/book/components/CatalogDialog.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElButton, ElDialog, ElRadioGroup } from 'element-plus'

// 获取路由实例
const router = useRouter()
const isCatalogDialogVisible = ref(false)

const goToBookDetail = (id) => {
  router.push({ name: 'BookDetail', params: { id } })
}

const handleChapterSelected = (chapter) => {
  console.log('选择章节:', chapter)
}

const props = defineProps({
  bookId: {
    type: String,
  },
  chapterId: {
    type: String,
  },
})
console.log('chapterId: ' + props.chapterId)
// 示例数据
const novel = reactive({
  title: '天命在汉',
  author: '微兮凉',
  category: '古代言情',
  wordCount: '100万',
})

const currentChapter = reactive({
  number: 1,
  title: '南阳公主',
  content:
    '南阳，沃土千里，经济繁荣，钟灵敏秀，人才辈出，更是刘家龙兴之地。昔日世祖皇帝于南阳起兵，歃血昆阳，长驱武关，横扫六合，重塑刘汉之辉煌，奠定千秋基业。\n' +
    '时光荏苒，百年转瞬，黄巾乱起，汉室倾颓，群雄逐鹿。于危难之际，烈祖皇帝挺身而出，于南阳宛城迎献帝，而后西入关中，东定河北，诛除奸佞，力挽狂澜，使大汉国祚得以延续，再焕生机。\n' +
    '当大汉第二十八代帝王之第五女呱呱坠地之时，天地异象纷呈，史书载曰：“雒阳之海棠千树，非时而艳，竞相吐蕊，冀州久旱，终逢霖雨，田野沐泽”，此等祥瑞，皇帝龙颜大悦，以为此乃刘汉天命所归之兆，遂赐公主以“南阳”为封号，更将其汤沐邑定于宛城，食邑千户，寓意天命在汉，南阳公主之尊荣，可见一斑。\n' +
    '自古公主封地，多在及笄之年以后，而南阳公主独享殊荣，甫一降生，便已获实封，足见其受荣宠之深。\n' +
    '后世多揣测，彼之出生时异象，一如昔日太祖皇帝蛟龙化身之传说。\n' +
    '然而，当日雒阳百姓亲眼目睹，九月之秋，海棠竟违背时令，满城绽放，经久不衰，宛若天神赐福人间。况乎雒阳本无海棠，乃当初烈祖皇帝攘除奸凶，平定四方，入主雒阳后，才为雒阳带来这"花中仙子"，故雒阳百姓深信海棠为祥瑞之花。南阳公主应运而生，伴此奇花，更添天命所归之色彩。\n' +
    '彼时，冀州之地，久旱不雨，百姓苦不堪言，忽一日甘霖普降，久旱终得解，预示大灾已去。当今圣上，非以太子之尊继统，乃于政治斗争中脱颖而出，登基之初，根基未稳，朝臣多有觊觎。圣上即位之后，即与朝臣展开权力之争，历经艰辛，终得大权在握。然未几，又遭十年天灾水患之侵袭，幸而圣上宵衣旰食，勤政爱民，屡颁减免赋税、保全民生之诏令，方得国泰民安。\n' +
    '当冀州大雨之捷报与公主诞生之喜讯同时传入圣听，圣上自是喜出望外，倍感轻松，以为此乃上天所赐之福祉，故对南阳公主极尽宠爱。\n' +
    '有人暗自庆幸，伴异象而生者非皇子之尊，否则太子与朝堂诸公何以自安？公主虽享万般宠爱，终究不过待字闺中，嫁作他人妇。\n' +
    '公主之母，出身常山赵氏，乃历经四朝的勋贵之家，昔日随烈祖出征的永昌亭候之后。圣上初登大宝，即召之入宫，诞下皇长子之后，圣上便以无所出废黜原皇后郑氏，立赵氏为皇后，迄今，皇后已为帝诞育二子二女，情深意笃。圣上初政之时，内忧外患交织，赵后全力扶持。如今帝后伉俪情深，皆因昔日共度时艰，患难见真情之故。\n' +
    '要说南阳公主最具有神妙的故事，莫过于”梦中得仙人语”,\n' +
    '史书记南阳公主于稚龄三岁之时，沉浸于一场瑰丽非凡的梦境之中。梦中，她仿佛脱离了尘世的束缚，踏足于飘渺的云端之上，与一位超凡脱俗的仙人并肩而行。随着轻盈的步伐，她的眼前展开了一幅幅如梦如幻的画卷，云海翻腾，时而轻柔如棉絮，时而汹涌似波涛，令人心旷神怡。\n' +
    '公主随那仙人漫步于云端之间，穿越层层云海，踏入一片朦胧的青霭之中。青霭缭绕，如同轻纱遮面，神秘莫测，让人忍不住想要一探究竟。\n' +
    '待晨曦初破，梦醒时分，公主耳畔似乎还回响着那仙人飘渺的话语和云端之上轻风拂过的声音。其稚嫩之唇轻启，首句便是那超脱尘世的妙语：“白云回望合，青霭入看无。”此言一出，在场的帝后皆是大为震撼，目光中满是不可置信。\n' +
    '皇帝连忙俯身，温柔地询问爱女，此等意境深远的诗句究竟源自何方。南阳公主眨着晶亮的眼眸，仿佛仍沉浸于那梦中之景，轻声细语道：“此乃梦中仙人所语，其音缈缈，其意悠悠，儿臣醒来，犹觉耳畔回响，故脱口而出。”。\n' +
    '此言一出，殿内更添几分神秘与向往。众人不禁遐想，莫非真有仙人跨越凡尘，于公主梦境中留下这抹不去的仙踪？那“白云回望合”之景，如同天际流云轻拢慢捻，回首间已融为一体；而“青霭入看无”之句，又似山间薄雾，近观则隐，远望更添朦胧之美，无不透露出超凡脱俗的韵味。\n' +
    '于是，南阳公主三岁梦得仙诗之事，迅速在宫廷内外传为佳话，人们纷纷议论，赞叹南阳公主不仅出生时伴有天地异象，更在幼小便能得仙人托梦，赋得仙诗，实在是天命所归。\n' +
    '自孝灵帝始设鸿都门学以来，广开才路，招揽了一批擅长文赋的儒林才子，予以重用，之后更是涌现了一批熠熠生辉的文学巨匠。\n' +
    '昭武帝时期，文风更盛，帝王雅好文学，常于御前汇聚群贤，共赏诗词歌赋之美，并亲命使者遍访民间，搜集佳作，对于那些才华横溢的诗篇与辞赋，更是不吝赐予殊荣，以示嘉勉。此举极大地激发了士人的创作热情，文学之风蔚然成风。\n' +
    '尤为值得一提的是，昭武帝明令废止五石散之服用，这一举措不仅改善士人身心健康，更深刻地改变了士人集会的文化风貌。昔日以清谈为主的聚会场景逐渐淡出，取而代之的是激昂的吟诗与深情的作赋，文学交流成为士人相聚的新风尚。在此背景之下，那些才情横溢、文采飞扬的士人迅速成为各王侯将相争相延揽的座上宾。大汉崇尚文风由来已久。\n' +
    '因此南阳公主日后才华横溢，出口成章，成为了士人崇敬的对象，而那次梦得仙诗，似乎是公主才华初露端倪的预兆。',
  wordCount: '2000',
  updateTime: '2024-12-17',
})

const formattedContent = computed(() => {
  return currentChapter.content
    .split('\n') // 按换行符分割
    .map((line) => `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${line}`) // 每行前添加两个空格
    .join('<br><br>') // 使用 <br> 进行换行
})

const catalogDialogRef = ref()
const settingIsVisible = ref(false)
// 方法
const openCatalogDialog = () => {
  catalogDialogRef.value.open(2)
}
// 打开设置弹窗
const openSettingsDialog = () => {
  settingIsVisible.value = true
}
const themeColors = ['#eaeaea', '#e6e1d6', '#c8dfca', '#cedde1', '#0a0a0a'] // 可选的主题颜色
const contentColors = ['#f3f3f3','#f5f1e8','#ddebde','#dae9ed','#111111']


const themeColor = ref(themeColors[1]); // 默认背景色
const contentColor = ref(contentColors[1])

const fontColor = ref('black')
const size = ref(18)
const fontSize = ref('18px') // 默认字体大小
const fontStyle = ref('微软雅黑')
// 修改阅读主题

const changeTheme = (index) => {
  console.log(index)
  if(index===4)
    fontColor.value = '#ffffff'
  else{
    fontColor.value = 'black'
  }

  themeColor.value = themeColors[index]
  contentColor.value = contentColors[index]
}
const changeFontSize = (action) => {
  if (action === 'increase' && size.value < 30) {
    size.value += 1
  } else if (action === 'decrease' && size.value > 12) {
    size.value -= 1
  }
  fontSize.value = size.value + 'px'
}
</script>
<template>
  <div class="main" :style="{ backgroundColor: themeColor}">
    <div class="novel-content-page">
      <!-- 内容区 -->
      <div class="content-main w" :style="{ backgroundColor: contentColor}">
        <h2 class="chapter-title" :style="{ color: fontColor }">第一章 {{ currentChapter.title }}</h2>
        <!-- 添加书籍相关信息 -->
        <div class="chapter-info" :style="{ color: fontColor }">
          <p>
            <svg class="icon chapterIcon" aria-hidden="true">
              <use xlink:href="#icon-shu_o"></use>
            </svg>
            {{ novel.title }}
          </p>
          <p>
            <svg class="icon chapterIcon" aria-hidden="true">
              <use xlink:href="#icon-zuozhe"></use>
            </svg>
            {{ novel.author }}
          </p>
          <p>
            <svg class="icon chapterIcon" aria-hidden="true">
              <use xlink:href="#icon-zishu"></use>
            </svg>
            {{ currentChapter.wordCount }}
          </p>
          <p>
            <svg class="icon chapterIcon" aria-hidden="true">
              <use xlink:href="#icon-shijian"></use>
            </svg>
            {{ currentChapter.updateTime }}
          </p>
        </div>
        <div class="chapter-content">
          <pre :style="{ color: fontColor , fontSize: fontSize , fontFamily: fontStyle}" v-html="formattedContent"></pre>
        </div>
      </div>

      <div>
        <el-affix class="side-affix">
          <div class="sidebar">
            <!-- 目录 -->
            <span class="sidebar-section" :style="{ backgroundColor: contentColor}" @click="openCatalogDialog">
              <svg class="icon chapterIcon" aria-hidden="true">
                <use xlink:href="#icon-yueduye-mulu"></use>
              </svg>
              <span class="catalog">目录</span>
            </span>

            <!-- 书详情 -->
            <span class="sidebar-section detail" :style="{ backgroundColor: contentColor}" @click="goToBookDetail(bookId)">
              <svg class="icon chapterIcon" aria-hidden="true">
                <use xlink:href="#icon-shu"></use>
              </svg>
              <span>书籍详情</span>
            </span>

            <!-- 加书架 -->
            <span class="sidebar-section bookshelf" :style="{ backgroundColor: contentColor}">
              <svg class="icon chapterIcon" aria-hidden="true">
                <use xlink:href="#icon-jiarushujia"></use>
              </svg>
              <span>加入书架</span>
            </span>

            <!-- 投票 -->
            <span class="sidebar-section" :style="{ backgroundColor: contentColor}">
              <svg class="icon chapterIcon" aria-hidden="true">
                <use xlink:href="#icon-toupiao"></use>
              </svg>
              <span class="vote">投票</span>
            </span>

            <!-- 上一章 -->
            <span class="sidebar-section" :style="{ backgroundColor: contentColor}">
              <el-icon size="30" class="chapterIcon"><ArrowLeftBold /></el-icon>
              <span class="last-chapter">上一章</span>
            </span>

            <!-- 下一章 -->
            <span class="sidebar-section" :style="{ backgroundColor: contentColor}">
              <el-icon size="30" class="chapterIcon"><ArrowRightBold /></el-icon>
              <span class="next-chapter">下一章</span>
            </span>

            <!-- 设置 -->
            <span class="sidebar-section" :style="{ backgroundColor: contentColor}" @click="openSettingsDialog">
              <svg class="icon chapterIcon" aria-hidden="true">
                <use xlink:href="#icon-shezhi"></use>
              </svg>
              <span class="section">设置</span>
            </span>
          </div>
        </el-affix>
      </div>

      <div class="catalog-dialog">
        <CatalogDialog
          ref="catalogDialogRef"
          @update:isVisible="isCatalogDialogVisible = $event"
          @chapter-selected="handleChapterSelected"
        />
      </div>
      <div class="setting-dialog">
        <el-dialog title="设置" v-model="settingIsVisible" width="450px" top="240px" style="margin-left: 720px">
          <div class="settings-content">
            <!-- 阅读主题 -->
            <div class="setting-item">
              <label>阅读主题:</label>
              <div class="theme-options">
                <div
                  class="theme-circle"
                  v-for="(color, index) in themeColors"
                  :key="index"
                  :style="{ backgroundColor: color }"
                  @click="changeTheme(index)"
                ></div>
              </div>
            </div>

            <!-- 正文字体 -->
            <div class="setting-item">
              <label>正文字体:</label>
              <div class="font">
                <el-radio-group v-model="fontStyle">
                  <el-radio-button label="黑体" style="font-family: '微软雅黑', 'serif'"
                    >黑体</el-radio-button
                  >
                  <el-radio-button label="仿宋" style="font-family: '宋体', 'serif'"
                    >宋体</el-radio-button
                  >
                  <el-radio-button label="楷体" style="font-family: '楷体', 'serif'"
                    >楷体</el-radio-button
                  >
                </el-radio-group>
              </div>
            </div>

            <!-- 字体大小 -->
            <div class="setting-item">
              <label>字体大小:</label>
              <div class="font-size-controls">
                <el-button @click="changeFontSize('decrease')">A-</el-button>
                <span>{{ fontSize }}</span>
                <el-button @click="changeFontSize('increase')">A+</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {

  margin: -7px;
}

.novel-content-page {
  display: flex;
  gap: 20px;
  padding: 20px;
  width: calc(100% - 250px); /* 计算宽度，避免受弹窗影响 */
  max-width: 900px; /* 限制最大宽度 */
  margin-left: 178px;
}

.content-main {
  flex: 5;
  background: #f5f1e8;
  padding: 70px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .chapter-title {
    margin-bottom: 10px;
    font-size: 25px;
    font-family: '微软雅黑', serif;
    font-weight: normal;
  }

  .chapter-info {
    font-size: 14px;
    color: #666;

    p {
      float: left;
      margin-right: 20px;
    }

    .chapterIcon {
      height: 15px;
      width: 15px;
    }
  }

  .chapter-content {
    margin-top: 70px;

    pre {
      max-width: 740px;
      word-wrap: break-word; /* 超出范围时自动换行 */
      word-break: break-word; /* 避免长单词超出容器边界 */
      white-space: pre-wrap; /* 保留换行和空格 */
      line-height: 1.8; /* 行高，优化可读性 */
      font-family: '微软雅黑', 'Courier New', monospace; /* 等宽字体增强排版效果 */
      font-size: 18px;
      color: black;
    }
  }
}

.side-affix {
  .sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sidebar-section {
    position: relative;
    height: 70px;
    width: 70px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f5f1e8;
    color: #6c6b6b;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s;

    .chapterIcon {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 15px;
      left: 20px;
      fill: currentColor; /* 使用 currentColor 同步颜色 */
    }

    span {
      position: absolute;
      font-size: 14px;
      left: 6px;
      top: 45px;
    }

    .catalog {
      left: 18px;
    }

    .vote {
      left: 18px;
    }

    .section {
      left: 18px;
    }

    .last-chapter {
      left: 12px;
    }

    .next-chapter {
      left: 12px;
    }
  }

  .sidebar-section:hover {
    color: #ed0b38;
  }
}

.setting-dialog {
  .settings-content {
    display: flex;
    flex-direction: column;
  }

  .setting-item {
    margin-bottom: 20px;

    label {
      font-size: 15px;
      margin-top: 14px;
      margin-right: 15px;
      float: left;
    }

    .theme-options {
      display: flex;
      gap: 15px;
      float: left;

      .theme-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid #fff;
      }
    }

    .font {
      margin-top: -7px;
    }
  }

  .font-size-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .el-slider {
    width: 100%;
  }
}
</style>
