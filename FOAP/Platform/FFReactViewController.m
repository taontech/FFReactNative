//
//  FFReactViewController.m
//  FFReactNative
//
//  Created by Jun on 16/5/30.
//  Copyright © 2016年 Wanda. All rights reserved.
//

#import "FFReactViewController.h"
#import "CodePush.h"
#import "RCTRootView.h"

@interface FFReactViewController ()

@end

@implementation FFReactViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    NSURL *jsCodeLocation = [NSURL URLWithString:self.urlString];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                       moduleName :self.moduleName
                                                 initialProperties:self.dataDic
                                                     launchOptions:nil];
    rootView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    rootView.frame = self.view.bounds;
    [self.view addSubview:rootView];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
