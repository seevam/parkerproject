export interface ZoneSpec {
  key: string;
  value: string;
}

export interface Zone {
  id: string;
  tag: string;
  name: string;
  location: string;
  description: string;
  specs: ZoneSpec[];
  color: string;
  glowColor: string;
  animationType: 'pulse' | 'scan' | 'flow' | 'rings' | 'arc' | 'rays' | 'particles' | 'heatmap';
  // SVG layout position (percentage of chip area)
  x: number;
  y: number;
  w: number;
  h: number;
}

export const ZONES: Zone[] = [
  {
    id: 'cpu_core',
    tag: 'CPU CORE',
    name: 'Central Processing Unit',
    location: 'Center-left die area',
    description:
      'The brain of the chip. Executes billions of instructions per second, managing logic, arithmetic, and program flow across multiple cores.',
    specs: [
      { key: 'Architecture', value: 'ARM / x86-64' },
      { key: 'Cores', value: '8P + 4E' },
      { key: 'Clock', value: '3.2–4.8 GHz' },
      { key: 'Process', value: '3nm' },
    ],
    color: '#0A84FF',
    glowColor: 'rgba(10,132,255,0.6)',
    animationType: 'pulse',
    x: 12, y: 20, w: 28, h: 30,
  },
  {
    id: 'gpu_block',
    tag: 'GPU BLOCK',
    name: 'Graphics Processing Unit',
    location: 'Lower-left die area',
    description:
      'Handles parallel visual computation — rendering graphics, video decode, and increasingly, AI workloads via shader units.',
    specs: [
      { key: 'VRAM', value: '16 GB LPDDR5' },
      { key: 'Shader Units', value: '4096' },
      { key: 'Render', value: '120 fps / 4K' },
      { key: 'API', value: 'Metal / Vulkan' },
    ],
    color: '#00E5FF',
    glowColor: 'rgba(0,229,255,0.6)',
    animationType: 'scan',
    x: 12, y: 55, w: 28, h: 25,
  },
  {
    id: 'memory_bus',
    tag: 'MEMORY BUS',
    name: 'High-Speed Data Lanes',
    location: 'Right edge of die',
    description:
      'High-bandwidth channels that carry data between the processor, memory, and I/O systems. Wider bus = faster data movement.',
    specs: [
      { key: 'Bandwidth', value: '800 GB/s' },
      { key: 'Bus Width', value: '256-bit' },
      { key: 'Latency', value: '<10 ns' },
      { key: 'Protocol', value: 'LPDDR5X' },
    ],
    color: '#0A84FF',
    glowColor: 'rgba(10,132,255,0.5)',
    animationType: 'flow',
    x: 72, y: 20, w: 18, h: 55,
  },
  {
    id: 'cache_layer',
    tag: 'CACHE LAYER',
    name: 'L1 / L2 / L3 Cache',
    location: 'Center die area',
    description:
      'Ultra-fast on-chip memory hierarchy. L1 sits closest to each core; L3 is shared. Reduces time spent fetching data from slower DRAM.',
    specs: [
      { key: 'L1', value: '192 KB/core' },
      { key: 'L2', value: '16 MB' },
      { key: 'L3 (shared)', value: '64 MB' },
      { key: 'Hit Rate', value: '>95%' },
    ],
    color: '#00E5FF',
    glowColor: 'rgba(0,229,255,0.5)',
    animationType: 'rings',
    x: 42, y: 20, w: 26, h: 30,
  },
  {
    id: 'power_delivery',
    tag: 'POWER DELIVERY',
    name: 'VRM / Power Modules',
    location: 'Bottom edge of chip',
    description:
      'Voltage regulator modules step down and stabilize power delivered to the die. Critical for both performance headroom and energy efficiency.',
    specs: [
      { key: 'TDP', value: '45W (base) / 95W (boost)' },
      { key: 'Voltage Rails', value: '1.0V core' },
      { key: 'VRM Phases', value: '12' },
    ],
    color: '#FFB800',
    glowColor: 'rgba(255,184,0,0.6)',
    animationType: 'arc',
    x: 12, y: 83, w: 76, h: 12,
  },
  {
    id: 'io_controller',
    tag: 'I/O CONTROLLER',
    name: 'Input/Output Hub',
    location: 'Top edge of chip',
    description:
      'Manages all external data pathways — from PCIe slots to USB ports. Determines what you can plug in and how fast data moves in and out.',
    specs: [
      { key: 'PCIe', value: 'Gen 5 x16' },
      { key: 'USB', value: '4x USB4 (40Gbps)' },
      { key: 'Thunderbolt', value: '4' },
      { key: 'SATA', value: '6x' },
    ],
    color: '#0A84FF',
    glowColor: 'rgba(10,132,255,0.5)',
    animationType: 'rays',
    x: 12, y: 5, w: 76, h: 11,
  },
  {
    id: 'neural_engine',
    tag: 'NEURAL ENGINE',
    name: 'AI / ML Accelerator',
    location: 'Center-right die area',
    description:
      'Purpose-built silicon for AI inference. Runs large models far more efficiently than general CPU/GPU, enabling on-device ML without cloud dependency.',
    specs: [
      { key: 'Performance', value: '38 TOPS' },
      { key: 'Supported', value: 'CoreML / ONNX / TFLite' },
      { key: 'Precision', value: 'INT8/FP16' },
    ],
    color: '#BF5FFF',
    glowColor: 'rgba(191,95,255,0.6)',
    animationType: 'particles',
    x: 42, y: 55, w: 26, h: 24,
  },
  {
    id: 'thermal_zone',
    tag: 'THERMAL ZONE',
    name: 'Heat Spreader / IHS',
    location: 'Outer perimeter (IHS border)',
    description:
      'The integrated heat spreader (IHS) distributes heat from the die to the cooler above. Thermal design directly impacts sustained performance.',
    specs: [
      { key: 'Max Tj', value: '105°C' },
      { key: 'TIM', value: 'Liquid Metal' },
      { key: 'Theta-JC', value: '0.15°C/W' },
      { key: 'Spread', value: 'Cu/Graphene' },
    ],
    color: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.6)',
    animationType: 'heatmap',
    x: 1, y: 1, w: 98, h: 98,
  },
];
