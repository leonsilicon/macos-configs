export type Window = {
	id: number;
	pid: number;
	app: string;
	title: string;
	frame: { x: number; y: number; w: number; h: number };
	level: number;
	role: string;
	subrole: string;
	movable: number;
	resizable: number;
	display: number;
	space: number;
	focused: number;
	split: string;
	floating: number;
	sticky: number;
	minimized: number;
	topmost: number;
	opacity: number;
	shadow: number;
	border: number;
	'stack-index': number;
	'zoom-parent': number;
	'zoom-fullscreen': number;
	'native-fullscreen': number;
};

type Distinct<T, N> = T & {
	__type: N;
};

export type SpaceId = Distinct<number, 'space'>;
export type DisplayId = Distinct<number, 'display'>;
export type DisplayUuid = Distinct<number, 'displayUuid'>;
export type DisplayIndex = Distinct<number, 'displayIndex'>;

export type State = Record<
	SpaceId,
	{
		numMasterWindows: number;
	}
>;

export type Display = {
	id: DisplayId;
	uuid: DisplayUuid;
	index: DisplayIndex;
	spaces: number[];
	frame: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
};

export type Space = {
	id: SpaceId;
	label: string;
	index: number;
	display: number;
	windows: number[];
	type: string;
	visible: number;
	focused: number;
	'native-fullscreen': number;
	'first-window': number;
	'last-window': number;
};
