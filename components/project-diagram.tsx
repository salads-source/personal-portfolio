type ProjectDiagramProps = {
  type: "log-pipeline" | "agent-orchestration" | "kyc-pipeline" | "data-quality";
};

function Connector({ x1, x2, y = 120 }: { x1: number; x2: number; y?: number }) {
  return <g className="diagram-connector">
    <path className="flow-rail" d={`M${x1} ${y}H${x2}`} />
    <path className="flow-active" d={`M${x1} ${y}H${x2}`} />
    <path d={`M${x2 - 8} ${y - 5}l8 5-8 5`} />
  </g>;
}

function LogPipeline() {
  return <svg viewBox="0 0 640 240" role="presentation">
    <g className="diagram-box">
      <rect x="24" y="87" width="108" height="66" rx="2" />
      <path d="M44 108h68M44 120h52M44 132h62" />
      <text x="78" y="70">LOG EVENTS</text>
    </g>
    <Connector x1={132} x2={190} />
    <g className="kafka-store">
      <path d="M190 72h246v96H190z" />
      <ellipse cx="190" cy="120" rx="28" ry="48" />
      <ellipse cx="272" cy="120" rx="28" ry="48" />
      <ellipse cx="354" cy="120" rx="28" ry="48" />
      <ellipse cx="436" cy="120" rx="28" ry="48" />
      <text className="diagram-title" x="313" y="51">KAFKA</text>
      <text x="231" y="121">P0</text><text x="313" y="121">P1</text><text x="395" y="121">P2</text>
    </g>
    <Connector x1={464} x2={506} />
    <g className="diagram-box diagram-accent-box">
      <rect x="506" y="87" width="110" height="66" rx="2" />
      <text x="561" y="121">CLICKHOUSE</text>
    </g>
  </svg>;
}

function AgentOrchestration() {
  return <svg viewBox="0 0 640 240" role="presentation">
    <g className="diagram-box"><rect x="24" y="90" width="104" height="60" rx="2" /><text x="76" y="121">TASK</text></g>
    <Connector x1={128} x2={178} />
    <g className="orchestrator-box">
      <rect x="178" y="54" width="278" height="132" rx="2" />
      <text className="diagram-title" x="317" y="75">ADK ORCHESTRATOR</text>
      <rect x="198" y="98" width="68" height="48" rx="2" /><text x="232" y="123">PLAN</text>
      <rect x="283" y="98" width="68" height="48" rx="2" /><text x="317" y="123">TOOLS</text>
      <rect x="368" y="98" width="68" height="48" rx="2" /><text x="402" y="123">EVAL</text>
      <path className="inner-flow" d="M266 122h17M351 122h17" />
    </g>
    <Connector x1={456} x2={506} />
    <g className="diagram-box diagram-accent-box"><rect x="506" y="90" width="110" height="60" rx="2" /><text x="561" y="116">PULL</text><text x="561" y="130">REQUEST</text></g>
  </svg>;
}

function KycPipeline() {
  return <svg viewBox="0 0 640 240" role="presentation">
    <g className="diagram-box document-box">
      <path d="M28 74h76l22 22v70H28z" /><path d="M104 74v23h22M48 111h58M48 125h48M48 139h54" />
      <text x="77" y="188">DOCUMENT</text><path className="scan-line" d="M32 103h90" />
    </g>
    <Connector x1={126} x2={166} />
    <g className="diagram-box"><rect x="166" y="89" width="100" height="62" rx="2" /><text x="216" y="121">OCR</text></g>
    <Connector x1={266} x2={306} />
    <g className="diagram-box"><rect x="306" y="89" width="114" height="62" rx="2" /><text x="363" y="116">RAG</text><text x="363" y="130">RULES</text></g>
    <Connector x1={420} x2={480} />
    <g className="diagram-box diagram-accent-box"><rect x="480" y="81" width="136" height="78" rx="2" /><path className="decision-check" d="M505 120l12 12 24-27" /><text x="572" y="121">DECISION</text></g>
  </svg>;
}

function DataQuality() {
  return <svg viewBox="0 0 640 240" role="presentation">
    <g className="diagram-box"><rect x="24" y="90" width="98" height="60" rx="2" /><text x="73" y="116">DATABASE</text><text x="73" y="130">OWNER</text></g>
    <Connector x1={122} x2={170} />
    <g className="diagram-box policy-box"><rect x="170" y="78" width="126" height="84" rx="2" /><path d="M211 112v-9a22 22 0 0144 0v9" /><rect x="204" y="112" width="58" height="34" rx="2" /><text x="233" y="130">ACCESS</text></g>
    <Connector x1={296} x2={344} />
    <g className="diagram-box compute-box">
      <rect x="344" y="58" width="272" height="124" rx="2" />
      <text className="diagram-title" x="480" y="79">COMPUTE CONFIG</text>
      <text x="371" y="105">CPU</text><text x="371" y="130">MEM</text><text x="371" y="155">JOBS</text>
      <path className="meter-rail" d="M401 102h184M401 127h184M401 152h184" />
      <path className="meter-value meter-one" d="M401 102h118" /><path className="meter-value meter-two" d="M401 127h86" /><path className="meter-value meter-three" d="M401 152h146" />
    </g>
  </svg>;
}

export function ProjectDiagram({ type }: ProjectDiagramProps) {
  if (type === "log-pipeline") return <LogPipeline />;
  if (type === "agent-orchestration") return <AgentOrchestration />;
  if (type === "kyc-pipeline") return <KycPipeline />;
  return <DataQuality />;
}
