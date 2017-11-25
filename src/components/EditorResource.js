const React = require('react')
const classNames = require('classnames')
const {withStateHandlers} = require('recompose')
const {EditorSchema} = require('./EditorSchema')


// Module API

function EditorResource({

  // Props
  index,
  descriptor,
  updatePackage,

  // State
  isSettingsActive,
  toggleSettings,

}) {
  return (
    <div className="panel">

      {/* Metadata */}
      <div className="panel-heading" role="tab" id="resource-one-heading">

        {/* Name */}
        <div className="title">
          <label>Name</label>
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            value={descriptor.name}
            onChange={(event) => {
              updatePackage({
                type: 'UPDATE_RESOURCE',
                resourceIndex: index,
                resourceDescriptor: {name: event.target.value}
              })
            }}
          />
        </div>

        {/* Actions */}
        <div className="actions">

          {/* Remove */}
          <a
            onClick={(event) => {
              updatePackage({
                type: 'REMOVE_RESOURCE',
                resourceIndex: index,
              })
            }}
          >
            <svg><use xlinkHref="#icon-trashcan" /></svg>
            <span className="text">Remove</span>
          </a>

          {/* Settings */}
          <a
            className={classNames('settings-button', 'action', {active: isSettingsActive})}
            onClick={toggleSettings}
          >
            <svg><use xlinkHref="#icon-settings" /></svg>
            <span className="text">Settings</span>
          </a>

          {/* Expand/collapse */}
          <a
            role="button"
            data-toggle="collapse"
            href={`#collapse${index}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <svg><use xlinkHref="#icon-expand" /></svg>
            <span className="text">Expand / collapse</span>
          </a>

        </div>

        <div className={classNames('settings', {active: isSettingsActive})}>
          <span>

            {/* Title */}
            <label className="control-label">Title</label>
            <input
              className="form-control"
              pattern="^([a-z0-9._-])+$"
              name="root[resources][0][name]"
              autoComplete="off"
              type="text"
              value={descriptor.title}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {title: event.target.value}
                })
              }}
            />

            {/* Profile */}
            <label className="control-label">Profile</label>
            <select
              data-id="list-container"
              className="form-control list-container"
              autoComplete="off"
              value={descriptor.profile}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {profile: event.target.value}
                })
              }}
            >
              <option value="data-resource">Data Resource</option>
              <option value="tabular-data-resource">Tabular Data Resource</option>
            </select>

            {/* Path */}
            <label className="control-label">Path</label>
            <input
              className="form-control"
              name="root[resources][0][path]"
              autoComplete="off"
              type="text"
              value={descriptor.path}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {path: event.target.value}
                })
              }}
            />

            {/* Format */}
            <label className="control-label">Format</label>
            <input
              className="form-control"
              name="root[resources][0][format]"
              autoComplete="off"
              type="text"
              value={descriptor.format}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {format: event.target.value}
                })
              }}
            />

            {/* Encoding */}
            <label className="control-label">Encoding</label>
            <input
              className="form-control"
              name="root[resources][0][encoding]"
              autoComplete="off"
              type="text"
              value={descriptor.encoding}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {encoding: event.target.value}
                })
              }}
            />

          </span>
          <span>

            {/* Description */}
            <label className="control-label">Description</label>
            <textarea
              className="form-control"
              data-schemaformat="textarea"
              name="root[resources][0][description]"
              value={descriptor.description}
              onChange={(event) => {
                updatePackage({
                  type: 'UPDATE_RESOURCE',
                  resourceIndex: index,
                  resourceDescriptor: {description: event.target.value}
                })
              }}
            />

          </span>
        </div>
      </div>

      {/* Schema */}
      <div
        id={`collapse${index}`}
        className={classNames('panel-collapse', 'collapse', {in: index === 0})}
        role="tabpanel"
        aria-labelledby="resource-one-heading"
      >
        <div className="panel-body">
          <EditorSchema
            descriptor={descriptor.schema || {}}
            resourceIndex={index}
            updatePackage={updatePackage}
          />
        </div>
      </div>

    </div>
  )
}


// Internal

const initialState = {
  isSettingsActive: false,
}

const toggleSettings = ({isSettingsActive}) => () => {
  return {isSettingsActive: !isSettingsActive}
}


// System

module.exports = {
  EditorResource: withStateHandlers(initialState, {
    toggleSettings,
  })(EditorResource),
}