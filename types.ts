
export enum Step {
  Roasting = 1,     // 炙茶
  Grinding = 2,     // 碾茶
  Milling = 3,      // 磨茶
  Boxing = 4,       // 茶末置盒
  Boiling = 5,      // 候汤
  Warming = 6,      // 烫盏
  Scooping = 7,     // 取粉
  Pouring = 8,      // 注汤
  Whisking = 9,     // 击拂
  Final = 10        // 品尝
}

export enum AppMode {
  Experience = 'experience',
  History = 'history',
  Challenge = 'challenge'
}

export interface StepInfo {
  id: Step;
  title: string;
  description: string;
  history: string;
  toolInfo: string;
}

export const STEP_DATA: Record<Step, StepInfo> = {
  [Step.Roasting]: { 
    id: Step.Roasting, 
    title: "第一步：炙茶", 
    description: "烤茶饼，使其香气散发。",
    history: "宋人点茶，重在‘鲜’。新采之茶制成团饼，藏之经年，饮前需微火炙烤，唤醒沉睡的茶香。",
    toolInfo: "茶炉：多用青铜或陶土制成，炭火宜微而不烈。"
  },
  [Step.Grinding]: { 
    id: Step.Grinding, 
    title: "第二步：碾茶", 
    description: "将炙烤过的茶饼碾碎成粗末。",
    history: "碾茶讲究‘快’。茶饼冷却后立刻碾碎，防止受潮。宋代茶碾常以金银或石材制成。",
    toolInfo: "茶碾：由碾槽和碾轴组成，轴如圆轮，来回滚动。"
  },
  [Step.Milling]: { 
    id: Step.Milling, 
    title: "第三步：磨茶", 
    description: "将粗茶末磨成极细的粉末。",
    history: "蔡襄《茶录》云：‘末要细’。细如蝉翼的茶粉是点茶挂杯、生沫的关键。",
    toolInfo: "茶磨：石质，上方有投入口，研磨需极度耐心。"
  },
  [Step.Boxing]: { 
    id: Step.Boxing, 
    title: "第四步：茶末置盒", 
    description: "将细茶末收入茶盒备用。",
    history: "研磨好的茶粉极易氧化。将其迅速收入精致的茶盒，既是保护，也是一种生活美学。",
    toolInfo: "茶盒：精美的漆器或瓷器，密封性极佳。"
  },
  [Step.Boiling]: { 
    id: Step.Boiling, 
    title: "第五步：候汤", 
    description: "选取山泉水，煮至‘鱼眼’沸腾。",
    history: "候汤是点茶的灵魂。宋人将沸水分为三沸，二沸（鱼眼水）最宜点茶，水温过高则茶‘老’。",
    toolInfo: "汤瓶：长流（壶嘴）设计，便于精准控制注水的力度与量。"
  },
  [Step.Warming]: { 
    id: Step.Warming, 
    title: "第六步：烫盏", 
    description: "温热茶盏，以便茶末与水充分融合。",
    history: "‘盏冷则茶沉’。温盏能保持茶汤温度，使茶沫持久不散，此谓‘咬盏’。",
    toolInfo: "建盏：宋代最负盛名的茶盏，其黑釉能完美衬托白色茶沫。"
  },
  [Step.Scooping]: { 
    id: Step.Scooping, 
    title: "第七步：取粉", 
    description: "取适量茶末入盏。",
    history: "用茶匙取粉，量多则苦，量少则淡。宋人对比例的把控已臻化境。",
    toolInfo: "茶匙/茶勺：多以黄金或竹木制成，形状如小匙。"
  },
  [Step.Pouring]: { 
    id: Step.Pouring, 
    title: "第八步：注汤", 
    description: "首次注水，调和茶膏。",
    history: "点茶注水需七次，首注最为关键。水少许，调如膏状，谓之‘调膏’。",
    toolInfo: "点茶法：与现代泡茶不同，更接近搅拌均匀的浓汤。"
  },
  [Step.Whisking]: { 
    id: Step.Whisking, 
    title: "第九步：击拂", 
    description: "快速搅动，产生细腻的泡沫。",
    history: "这是点茶的高潮。手部发力，如‘春云起于盏中’。高手的茶沫可数小时不散。",
    toolInfo: "茶筅：用细竹丝制成，是产生细腻泡沫的核心工具。"
  },
  [Step.Final]: { 
    id: Step.Final, 
    title: "第十步：点茶", 
    description: "大功告成，细品茶香。",
    history: "‘茶百戏’可在沫上绘图，或仅观其‘幻色’。这是宋代文人极致的浪漫。",
    toolInfo: "茶百戏：在茶汤上用清水作画的非遗技艺。"
  },
};
