/* @ds-bundle: {"format":4,"namespace":"AFRmulaDoSomDesignSystem_2ffd29","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CaptionTag","sourcePath":"components/core/CaptionTag.jsx"},{"name":"CategoryBadge","sourcePath":"components/core/CategoryBadge.jsx"},{"name":"IconChip","sourcePath":"components/core/IconChip.jsx"},{"name":"PromoCard","sourcePath":"components/core/PromoCard.jsx"},{"name":"PostGrid","sourcePath":"ui_kits/instagram/PostGrid.jsx"},{"name":"ProfileHeader","sourcePath":"ui_kits/instagram/ProfileHeader.jsx"}],"sourceHashes":{"components/core/Button.jsx":"d055c2cb1598","components/core/CaptionTag.jsx":"58e2ef0100f0","components/core/CategoryBadge.jsx":"09e363709bb3","components/core/IconChip.jsx":"a20fd1c4711d","components/core/PromoCard.jsx":"e7c8ef90a0b4","ui_kits/instagram/PostGrid.jsx":"a626e670bb31","ui_kits/instagram/ProfileHeader.jsx":"efa872bc7945"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AFRmulaDoSomDesignSystem_2ffd29 = window.AFRmulaDoSomDesignSystem_2ffd29 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled
}) {
  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: 13
    },
    medium: {
      padding: '12px 22px',
      fontSize: 15
    },
    large: {
      padding: '16px 28px',
      fontSize: 17
    }
  };
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform 0.15s ease, filter 0.15s ease',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: 'var(--gradient-flame)',
      color: '#1a0a02'
    },
    secondary: {
      background: 'var(--fg-charcoal-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--brand-orange)',
      border: '1px solid var(--brand-orange)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(1.12)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'none';
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.96)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CaptionTag.jsx
try { (() => {
function CaptionTag({
  children,
  tone = 'dark'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      padding: '8px 16px',
      background: tone === 'dark' ? 'var(--tag-bg)' : 'var(--gradient-flame)',
      color: tone === 'dark' ? 'var(--tag-text)' : '#1a0a02',
      borderRadius: 'var(--radius-s)'
    }
  }, children);
}
Object.assign(__ds_scope, { CaptionTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CaptionTag.jsx", error: String((e && e.message) || e) }); }

// components/core/CategoryBadge.jsx
try { (() => {
function CategoryBadge({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      padding: '5px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--fg-charcoal-2)',
      color: 'var(--brand-orange)',
      border: '1px solid var(--border-subtle)'
    }
  }, children);
}
Object.assign(__ds_scope, { CategoryBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CategoryBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/IconChip.jsx
try { (() => {
function IconChip({
  label,
  src,
  active = false,
  seen = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      width: 74
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      padding: 2,
      background: active ? 'var(--gradient-flame)' : seen ? 'var(--fg-line)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      padding: 2,
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label,
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, label));
}
Object.assign(__ds_scope, { IconChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconChip.jsx", error: String((e && e.message) || e) }); }

// components/core/PromoCard.jsx
try { (() => {
function PromoCard({
  image,
  caption,
  tag
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 220,
      height: 260,
      borderRadius: 'var(--radius-m)',
      overflow: 'hidden',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), (caption || tag) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      right: 10,
      bottom: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4
    }
  }, caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      background: 'var(--tag-bg)',
      color: 'var(--tag-text)',
      padding: '7px 12px',
      borderRadius: 'var(--radius-s)'
    }
  }, caption), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 11,
      background: 'var(--tag-bg)',
      color: 'var(--tag-text)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-s)'
    }
  }, tag)));
}
Object.assign(__ds_scope, { PromoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PromoCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/PostGrid.jsx
try { (() => {
const {
  useState
} = React;
const posts = [{
  image: '../../assets/imagery/car-bmw-garage.jpg',
  caption: 'Cansado da BMW que tudo mundo tem?',
  tag: 'Bora resolver!'
}, {
  image: '../../assets/imagery/car-civic-detail.jpg',
  caption: 'Quem disse que Civic não?'
}, {
  image: '../../assets/imagery/car-hexagon-lights.jpg'
}, {
  image: '../../assets/imagery/car-red-ppf.jpg',
  caption: 'Full PPF',
  tag: 'Gloss'
}, {
  image: '../../assets/imagery/car-night-install.jpg'
}, {
  image: '../../assets/imagery/car-interior-neon.jpg'
}];
function PostGrid() {
  const [openIndex, setOpenIndex] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 3,
      padding: '12px 0'
    }
  }, posts.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setOpenIndex(i),
    style: {
      cursor: 'pointer',
      aspectRatio: '1',
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })))), openIndex !== null && /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpenIndex(null),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(__ds_scope.PromoCard, posts[openIndex]))));
}
Object.assign(__ds_scope, { PostGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/PostGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/instagram/ProfileHeader.jsx
try { (() => {
function ProfileHeader() {
  const highlights = ['Iluminação', 'Película', 'Kit Neon RGB', 'Pole Position', 'Super Led', 'Revestimento', 'Multimídia'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-page)',
      padding: '32px 32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: '50%',
      padding: 3,
      background: 'var(--gradient-flame)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.jpg",
    alt: "A F\xF3rmula do Som",
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid var(--bg-page)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 20,
      fontWeight: 600
    }
  }, "a_formuladosom", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-orange)',
      fontSize: 16
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, "A F\xF3rmula do Som"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      margin: '14px 0',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "525"), " posts"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "226 mil"), " seguidores"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "1.988"), " seguindo")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.6
    }
  }, "Cars", /*#__PURE__*/React.createElement("br", null), "\u2022Desde 1994 \u2B50", /*#__PURE__*/React.createElement("br", null), "\u2022Confira nossos contatos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "small"
  }, "Seguir"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "small"
  }, "Enviar mensagem")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      overflowX: 'auto',
      padding: '28px 0 8px'
    }
  }, highlights.map(h => /*#__PURE__*/React.createElement(__ds_scope.IconChip, {
    key: h,
    label: h,
    src: "../../assets/logo-crop-circle.png",
    active: h === 'Pole Position'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      marginTop: 8
    }
  }));
}
Object.assign(__ds_scope, { ProfileHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/instagram/ProfileHeader.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CaptionTag = __ds_scope.CaptionTag;

__ds_ns.CategoryBadge = __ds_scope.CategoryBadge;

__ds_ns.IconChip = __ds_scope.IconChip;

__ds_ns.PromoCard = __ds_scope.PromoCard;

__ds_ns.PostGrid = __ds_scope.PostGrid;

__ds_ns.ProfileHeader = __ds_scope.ProfileHeader;

})();
