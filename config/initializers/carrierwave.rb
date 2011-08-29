CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',       # required
    :aws_access_key_id      => 'AKIAJMK2TIWWHBIG4I4Q',       # required
    :aws_secret_access_key  => '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',       # required
    :region                 => 'ap-northeast-1'  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'sogoke'                                # required
  config.fog_public     = true                                    # optional, defaults to true
  config.fog_attributes = { 'Cache-Control'=>'max-age=315576000' }  # optional, defaults to {}
end