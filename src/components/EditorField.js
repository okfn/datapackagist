const React = require('react')
const {connect} = require('react-redux')
const partial = require('lodash/partial')


// Pure components

function EditorFieldPure({

  // Props
  column,
  descriptor,
  // fieldIndex,
  // resourceIndex,

  // Handlers
  onRemoveClick,
  onUpdateChange,

}) {
  return (
    <div>

      {/* Heading */}
      <header>

        {/* Name */}
        <span className="drag"><svg><use xlinkHref="#icon-drag" /></svg></span>
        <input
          type="text"
          defaultValue={descriptor.name}
          id="title_3"
          style={{
            color: 'white',
            backgroundColor: '#00994c',
            border: 'solid 1px #00773b',
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
          }}
          onBlur={partial(onUpdateChange, 'name')}
        />

        {/* Remove */}
        <button
          type="button"
          className="action"
          aria-label="Remove"
          onClick={onRemoveClick}
        >
          <svg><use xlinkHref="#icon-trashcan" /></svg>
        </button>

      </header>

      {/* Preview */}
      <div className="preview">
        <ol>
          {!!column && column.values.slice(0, 10).map((value, index) => (
            <li key={index}><span>{value}</span></li>
          ))}
        </ol>
      </div>

      {/* Metadata */}
      <div className="field-info">

        {/* Title */}
        <label htmlFor="title_3">Title</label>
        <input
          type="text"
          defaultValue={descriptor.title}
          id="title_3"
          onBlur={partial(onUpdateChange, 'title')}
        />

        {/* Description */}
        <label htmlFor="description_3">Description</label>
        <textarea
          id="description_3"
          defaultValue={descriptor.description}
          onBlur={partial(onUpdateChange, 'description')}
        />

        {/* Type */}
        <label htmlFor="type_3">Data Type</label>
        <input
          type="text"
          id="type_3"
          defaultValue={descriptor.type}
          onBlur={partial(onUpdateChange, 'type')}
        />

        {/* Format */}
        <label htmlFor="format_3">Data Format</label>
        <input
          type="text"
          id="type_3"
          defaultValue={descriptor.format}
          onBlur={partial(onUpdateChange, 'format')}
        />

      </div>

    </div>
  )
}


// Handlers

const mapDispatchToProps = (dispatch, {resourceIndex, fieldIndex}) => ({

  onRemoveClick:
    () => {
      dispatch({
        type: 'REMOVE_FIELD',
        resourceIndex,
        fieldIndex,
      })
    },

  onUpdateChange:
    (name, ev) => {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {[name]: ev.target.value},
        resourceIndex,
        fieldIndex,
      })
    },

})


// Components

const EditorField = connect(null, mapDispatchToProps)(EditorFieldPure)


// System

module.exports = {

  // Public
  EditorField,

  // Private
  EditorFieldPure,

}
