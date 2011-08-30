class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  version :thumb do
    process :composition_with_honeycomb
  end
  
  def composition_with_honeycomb
    manipulate! do |img|
      cols, rows = img[:dimensions]
      img.combine_options do |cmd|
        if 80 != cols || 80 != rows
          scale = [80/cols.to_f, 80/rows.to_f].max
          cols = (scale * (cols + 0.5)).round
          rows = (scale * (rows + 0.5)).round
          cmd.resize "#{cols}x#{rows}"
        end
        cmd.gravity 'center'
        cmd.extent "#{70}x#{70}" if cols != 80 || rows != 80
      end      
      img = random_honeycomb.composite(img) { |c| c.gravity "center" }
    end
  end
  
  def random_honeycomb
    MiniMagick::Image.open "#{Rails.root}/app/assets/images/tube/1.png", "png"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    @name ||= "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
