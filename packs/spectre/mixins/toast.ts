// Avatar mixin
import {config} from '../config';

// Toast variant mixin
const toastVariant = ($color = config.darkColor) => ({
    background: $color.fade(0.9),
    borderColor: $color,
});
