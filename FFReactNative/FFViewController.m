//
//  FFViewController.m
//  FFReactNative
//
//  Created by Jun on 16/5/30.
//  Copyright © 2016年 Wanda. All rights reserved.
//

#import "FFViewController.h"
#import "../FOAP/Platform/FFReactViewController.h"

#define RGBCodeColor(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1]

@interface FFViewController ()

@property (nonatomic, strong) UIButton *plazaButton;
@property (nonatomic, strong) UIButton *brandButton;

@end

@implementation FFViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.title = @"React-Native实例";
    self.view.backgroundColor = RGBCodeColor(0xf4f3f2);
    [self.view addSubview:self.plazaButton];
}

- (UIButton *)plazaButton
{
    if (!_plazaButton) {
        _plazaButton = [UIButton buttonWithType:UIButtonTypeSystem];
        _plazaButton.backgroundColor = [UIColor blueColor];
        _plazaButton.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width - 50, 44);
        _plazaButton.center = CGPointMake(self.view.center.x, self.view.center.y - 13);;
        [_plazaButton setTitle:@"广场详情" forState:UIControlStateNormal];
        [_plazaButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [_plazaButton addTarget:self action:@selector(gotoPlazaViewController:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _plazaButton;
}

- (UIButton *)brandButton
{
    if (!_brandButton) {
        _brandButton = [UIButton buttonWithType:UIButtonTypeSystem];
        _brandButton.backgroundColor = [UIColor blueColor];
        _brandButton.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width - 50, 44);
        _brandButton.center = CGPointMake(self.view.center.x, self.view.center.y + 13);
        [_brandButton setTitle:@"品牌详情" forState:UIControlStateNormal];
        [_brandButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [_brandButton addTarget:self action:@selector(gotoPlazaViewController:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _plazaButton;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)gotoPlazaViewController:(id)sender
{
    NSString *urlString = @"http://localhost:8081/FOAP/Plazasjs/FFPlazaViewController.ios.bundle?platform=ios&dev=true";
    
    NSMutableDictionary *dataDic = [NSMutableDictionary dictionary];
    [dataDic setObject:@"100010" forKey:@"cityId"];
    [dataDic setObject:@"1000265" forKey:@"plazaId"];
    [dataDic setObject:@"广场详情页" forKey:@"title"];
    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    [params setObject:dataDic forKey:@"dataDic"];
    [params setObject:[dataDic objectForKey:@"title"] forKey:@"title"];
    [params setObject:@"FFPlazaViewController" forKey:@"moduleName"];
    [params setObject:urlString forKey:@"urlString"];
    
    FFReactViewController *controller = [[FFReactViewController alloc] initWithNibName:nil bundle:nil];
    for (NSString *requiredKey in params) {
        [controller setValue:[params objectForKey:requiredKey] forKey:requiredKey];
    }
    
    [self.navigationController pushViewController:controller animated:YES];
}

@end
