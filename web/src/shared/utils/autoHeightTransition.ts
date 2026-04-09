export type AutoHeightTransitionHooks = {
  onBeforeEnter: (el: Element) => void;
  onEnter: (el: Element) => void;
  onAfterEnter: (el: Element) => void;
  onBeforeLeave: (el: Element) => void;
  onLeave: (el: Element) => void;
  onAfterLeave: (el: Element) => void;
};

export type AutoHeightTransitionOptions = {
  enterMs?: number;
  leaveMs?: number;
  easing?: string;
};

export function createAutoHeightTransitionHooks(
  options: AutoHeightTransitionOptions = {},
): AutoHeightTransitionHooks {
  const enterMs = options.enterMs ?? 180;
  const leaveMs = options.leaveMs ?? 160;
  const easing = options.easing ?? 'ease';

  function onBeforeEnter(el: Element) {
    const element = el as HTMLElement;
    element.style.height = '0';
    element.style.opacity = '0';
    element.style.overflow = 'hidden';
  }

  function onEnter(el: Element) {
    const element = el as HTMLElement;
    // Force reflow to ensure transition is applied
    void element.offsetHeight;
    element.style.transition = `height ${enterMs}ms ${easing}, opacity ${enterMs}ms ${easing}`;
    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = '1';
  }

  function onAfterEnter(el: Element) {
    const element = el as HTMLElement;
    element.style.height = '';
    element.style.opacity = '';
    element.style.transition = '';
    element.style.overflow = '';
  }

  function onBeforeLeave(el: Element) {
    const element = el as HTMLElement;
    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = '1';
    element.style.overflow = 'hidden';
  }

  function onLeave(el: Element) {
    const element = el as HTMLElement;
    // Force reflow to ensure transition is applied
    void element.offsetHeight;
    element.style.transition = `height ${leaveMs}ms ${easing}, opacity ${leaveMs}ms ${easing}`;
    element.style.height = '0';
    element.style.opacity = '0';
  }

  function onAfterLeave(el: Element) {
    const element = el as HTMLElement;
    element.style.height = '';
    element.style.opacity = '';
    element.style.transition = '';
    element.style.overflow = '';
  }

  return {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
  };
}

