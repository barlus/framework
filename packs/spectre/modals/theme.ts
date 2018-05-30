import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Modal = "modal",
    active = "active",
    small = "modal-sm",
    large = "modal-lg",
    modalOverlay = "modal-overlay",
    modalContainer = "modal-container",
    modalHeader = "modal-header",
    modalBody = "modal-body",
    modalFooter = "modal-footer",
}
