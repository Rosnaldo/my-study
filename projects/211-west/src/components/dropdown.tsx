import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

type StyleProps = {
  transitionLength: string;
  transitionTiming: string;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: (props: StyleProps) => ({
    '&  .accordion-animation-wrapper': {
      display: 'grid',
      gridTemplateRows: '0fr',
      overflow: 'hidden',
      transition: `grid-template-rows ${props.transitionLength} ${props.transitionTiming}`
    },
    '&  .accordion-trigger-input:checked ~ .accordion-animation-wrapper': {
      gridTemplateRows: '1fr'
    },
    '&  .accordion-animation': {
      minHeight: 0
    },
    '&  .accordion-transform-wrapper': {
      transform: 'translateY(-100%)',
      visibility: 'hidden',
      transition: `transform ${props.transitionLength} ${props.transitionTiming}, visibility 0s ${props.transitionLength} ${props.transitionTiming}`
    },
    '&  .accordion-trigger-input:checked ~ .accordion-animation-wrapper .accordion-transform-wrapper':
      {
        transform: 'translateY(0)',
        visibility: 'visible',
        transition: `transform ${props.transitionLength} ${props.transitionTiming}, visibility 0s linear`
      },
    '&  .accordion-content *': {
      margin: 0
    },
    '& body': {
      margin: 0,
      padding: '16px 0',
      background: theme.palette.background.paper,
      color: 'while'
    },
    '& .accordion': {
      width: '100%',
      margin: '0 auto',
      background: theme.palette.background.paper
    },
    '&  .accordion-item': {
      borderTop: '2px solid #676767',
      borderBottom: '2px solid #676767',
      marginBottom: '-2px',
      overflow: 'hidden'
    },
    '& .accordion-trigger-input': {
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px'
    },
    '&  .accordion-trigger': {
      display: 'block',
      position: 'relative',
      padding: '16px',
      transition: `box-shadow ${props.transitionLength} ${props.transitionTiming}`,
      zIndex: 1,
      cursor: 'pointer',
      color: 'while'
    },
    '&  .accordion-trigger-input:focus-visible ~ .accordion-trigger': {
      outline: '2px solid',
      outlineOffset: '-2px'
    },
    '&  .accordion-trigger::after': {
      display: 'block',
      position: 'absolute',
      right: '16px',
      top: '18px',
      content: '',
      width: '8px',
      height: '8px',
      border: '2px solid #676767',
      borderBottom: 'transparent',
      borderLeft: 'transparent',
      transform: 'rotate(135deg)',
      transition: `transform ${props.transitionLength} ${props.transitionTiming}`
    },

    '& .accordion-trigger-input:checked ~  .accordion-trigger::after': {
      transform:
        'rotate(135deg) rotateX(180deg) rotateY(180deg) translateY(4px) translateX(-4px)'
    },

    '&  .accordion-trigger-input:checked ~ .accordion-trigger': {
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      transition: `box-shadow calc(${props.transitionLength} / 4) ${props.transitionTiming}`
    },

    '&  .accordion-content': {
      padding: '16px',
      background: theme.palette.background.paper,
      color: 'while'
    },

    '& .accordion-content h2': {
      paddingBottom: '0.75em'
    },

    '& .accordion-content p': {
      paddingBottom: '1.5em'
    },

    '& .accordion-content p:last-of-type': {
      paddingBottom: 0
    },

    '& .accordion-content img': {
      maxWidth: '100%'
    }
  })
}));

type Props = {
  items: {
    content: React.ReactNode;
    label: React.ReactNode;
  }[];
};

const Dropdown = ({ items }: Props) => {
  const classes = useStyles({
    transitionLength: '0.4s',
    transitionTiming: 'ease'
  });

  return (
    <div className={classes.root}>
      <div className="accordion">
        {items.map((item, index) => (
          <div className="accordion-item">
            <input
              id={`accordion-trigger-${index}`}
              className="accordion-trigger-input"
              type="checkbox"
            ></input>
            <label
              className="accordion-trigger"
              htmlFor={`accordion-trigger-${index}`}
            >
              {item.label}
            </label>
            <section className="accordion-animation-wrapper">
              <div className="accordion-animation">
                <div className="accordion-transform-wrapper">
                  <div key={index} className="accordion-content">
                    {item.content}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
