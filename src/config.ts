type ProgramInput = HTMLInputElement;
type ProgramButton = HTMLButtonElement;

type ProgramElement = ProgramInput | ProgramButton;
type ProgramElementRegistry = Record<string, ProgramElement>;

export const PROGRAM_ELEMENT_REGISTRY = {
   zoom: document.getElementById('zoom') as ProgramInput,
   height: document.getElementById('height') as ProgramInput,
   width: document.getElementById('width') as ProgramInput,
   fill: document.getElementById('fill') as ProgramInput,
   fn: document.getElementById('fn') as ProgramInput,
   strokeColor: document.getElementById('strokeColor') as ProgramInput,
   strokeWidth: document.getElementById('strokeWidth') as ProgramInput,
   xOffset: document.getElementById('xOffset') as ProgramInput,
   yOffset: document.getElementById('yOffset') as ProgramInput,
   noiseSeed: document.getElementById('seed') as ProgramInput,
   noiseDetail: document.getElementById('detail') as ProgramInput,
   noiseFalloff: document.getElementById('falloff') as ProgramInput,
   bg: document.getElementById('bg') as ProgramInput,
   downloadButton: document.getElementById('download') as ProgramButton,
} as const satisfies ProgramElementRegistry;
