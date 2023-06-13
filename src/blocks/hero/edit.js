import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import {
	PanelBody,
	Button,
	ResponsiveWrapper,
	TextControl,
	ToggleControl,
	SelectControl,
	Spinner
} from '@wordpress/components'
import { compose } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import './editor.scss'

const ALLOWED_MEDIA_TYPES = ['image']

const Hero = ({ attributes, setAttributes, bgmedia, bgmediamobile }) => {
	const blockProps = useBlockProps()
	const {
		bgmediaID,
		bgmediamobileID,
		title,
		text,
		ctatext,
		ctalink,
		ctatarget,
		layout,
		appearance,
		width,
		breadcrumbs
	} = attributes

	const className = `${blockProps.className} wp-block-rgdevme`
	const { media_details } = bgmedia ?? {}
	const dimensions = { ...media_details }

	const style = {
		'--bgdesktop': !!bgmedia?.source_url
			? `url(${bgmedia?.source_url})`
			: 'unset',
		'--bgmobile': !!bgmediamobile?.source_url
			? `url(${bgmediamobile?.source_url})`
			: 'unset'
	}
	const aspectRatio = !dimensions
		? 'unset'
		: dimensions.width / dimensions.heigth

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Layout settings')} initialOpen>
					<SelectControl
						value={layout}
						onChange={v => setAttributes({ layout: v })}
						options={[{ label: 'CTA Right', value: 'cta-right' }]}
						label='Layout'
					/>
					<SelectControl
						value={width}
						onChange={v => setAttributes({ width: v })}
						options={[
							{ label: 'Screen', value: 'screen' },
							{ label: 'Wide', value: 'wide' }
						]}
						label='Width'
					/>
					<ToggleControl
						checked={breadcrumbs}
						onChange={() => setAttributes({ breadcrumbs: !breadcrumbs })}
						label='Show breadcrumbs'
					/>
				</PanelBody>
				<PanelBody title={__('Texts settings')}>
					<TextControl
						value={title}
						onChange={v => setAttributes({ title: v })}
						label='Title'
					/>
					<TextControl
						value={text}
						onChange={v => setAttributes({ text: v })}
						label='Content'
					/>
					<SelectControl
						value={appearance}
						onChange={v => setAttributes({ appearance: v })}
						options={[
							{ label: 'Clear', value: 'clear' },
							{ label: 'Dark', value: 'dark' }
						]}
						label='Appearance'
					/>
				</PanelBody>
				<PanelBody title={__('CTA Settings')}>
					<TextControl
						value={ctatext}
						onChange={v => setAttributes({ ctatext: v })}
						label='CTA Text'
					/>
					<TextControl
						value={ctalink}
						onChange={v => setAttributes({ ctalink: v })}
						label='CTA Link'
					/>
					<ToggleControl
						checked={ctatarget}
						onChange={() => setAttributes({ ctatarget: !ctatarget })}
						label='Open CTA in another window'
					/>
				</PanelBody>
				<PanelBody title={__('Background settings', 'image-selector-example')}>
					<div className='wp-block-image-selector-example-image'>
						<MediaUploadCheck
							fallback={
								<p>
									{__(
										'To edit the background image, you need permission to upload media.',
										'image-selector-example'
									)}
								</p>
							}>
							<MediaUpload
								title={__('Background image', 'image-selector-example')}
								onSelect={image => setAttributes({ bgmediaID: image.id })}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={bgmedia}
								render={({ open }) => (
									<Button
										className={
											!bgmediaID
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}>
										{!bgmediaID &&
											__('Set background image', 'image-selector-example')}
										{!!bgmediaID && !bgmedia && <Spinner />}
										{!!bgmediaID && bgmedia && (
											<ResponsiveWrapper
												naturalWidth={bgmedia.media_details.width}
												naturalHeight={bgmedia.media_details.height}>
												<img
													src={bgmedia.source_url}
													alt={__('Background image', 'image-selector-example')}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{!!bgmediaID && bgmedia && (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Background image', 'image-selector-example')}
									onSelect={image => setAttributes({ bgmediaID: image.id })}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={bgmediaID}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__('Replace background image', 'image-selector-example')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}

						{!!bgmediaID && (
							<MediaUploadCheck>
								<Button
									onClick={() => setAttributes({ bgmediaID: undefined })}
									isLink
									isDestructive>
									{__('Remove background image', 'image-selector-example')}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
					<div className='wp-block-image-selector-example-image'>
						<MediaUploadCheck
							fallback={
								<p>
									{__(
										'To edit the background image, you need permission to upload media.',
										'image-selector-example'
									)}
								</p>
							}>
							<MediaUpload
								title={__('Background image', 'image-selector-example')}
								onSelect={image => setAttributes({ bgmediamobileID: image.id })}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={bgmediamobile}
								render={({ open }) => (
									<Button
										className={
											!bgmediamobileID
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}>
										{!bgmediamobileID &&
											__('Set background image', 'image-selector-example')}
										{!!bgmediamobileID && !bgmediamobile && <Spinner />}
										{!!bgmediamobileID && bgmediamobile && (
											<ResponsiveWrapper
												naturalWidth={bgmediamobile.media_details.width}
												naturalHeight={bgmediamobile.media_details.height}>
												<img
													src={bgmediamobile.source_url}
													alt={__('Background image', 'image-selector-example')}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{!!bgmediamobileID && bgmediamobile && (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Background image', 'image-selector-example')}
									onSelect={image =>
										setAttributes({ bgmediamobileID: image.id })
									}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={bgmediamobileID}
									render={({ open }) => (
										<Button onClick={open} isDefault isLarge>
											{__('Replace background image', 'image-selector-example')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}

						{!!bgmediamobileID && (
							<MediaUploadCheck>
								<Button
									onClick={() => setAttributes({ bgmediamobileID: undefined })}
									isLink
									isDestructive>
									{__('Remove background image', 'image-selector-example')}
								</Button>
							</MediaUploadCheck>
						)}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={className} style={{ aspectRatio }}>
				<div
					className='container'
					data-layout={layout}
					data-appearance={appearance}
					data-width={width}
					style={style}>
					{title !== '' && <h3 className='rgdevme-hero-title'>{title}</h3>}
					{text !== '' && <p className='rgdevme-hero-text'>{text}</p>}
					{ctalink !== '' && ctatext !== '' && (
						<div class='rgdevme-hero-cta wp-block-button'>
							<a
								class='wp-block-button__link'
								href={ctalink}
								target={ctatarget ? '_blank' : '_self'}>
								{ctatext}
							</a>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core')
		const { bgmediaID, bgmediamobileID } = props.attributes
		return {
			bgmedia: bgmediaID ? getMedia(bgmediaID) : null,
			bgmediamobile: bgmediamobileID ? getMedia(bgmediamobileID) : null
		}
	})
)(Hero)
